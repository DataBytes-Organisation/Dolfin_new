import json
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from werkzeug.security import check_password_hash
from flask_cors import CORS
import os
from services.database.db import Database
from services.security.auth import JWTManager
from services.api.basiq_api import Core as API_Core
from services.api.basiq_api import Data as API_Data
import pandas as pd
from services.ai.d_cloud.expenditure_cluster_model import cluster as d_cloud_cluster
from services.ai.d_cloud.word_cloud import generate as d_cloud_generate
from services.api.basiq_converter import BasiqConverter as API_Converter

load_dotenv()
app = Flask(__name__)
CORS(app)
mongodb_uri = os.environ.get('MONGODB_URI', 'mongodb://localhost:27017/')
db = Database(mongodb_uri)
auth = JWTManager(os.environ.get('SECRET_KEY', 'default_secret_key'))
api_core_instance = API_Core(os.environ.get("API_KEY"))
api_data_instance = API_Data()
access_token = api_core_instance.generate_auth_token()


@app.route('/')
def welcome():
    return '<h1>This is Dolfin server!</h1>'


@app.route('/api/create_new_user', methods=['POST'])
def create_new_user():
    data = request.get_json()
    user = db.find_user_by_email(data['email'])

    if user:
        return jsonify({'success': False, 'message': 'Email already exists.'}), 409

    new_basiq_id = json.loads(
        api_core_instance.create_user(data['firstName'], '', data['lastName'], data['email'], data['phone'],
                                      access_token)).get('id')
    db.add_user({
        'firstName': data['firstName'],
        'lastName': data['lastName'],
        'email': data['email'],
        'phone': data['phone'],
        'password': data['password'],
        'basiqAccount': new_basiq_id,
        'rfwScore': 0
    })

    return jsonify({'success': True, 'message': 'User created successfully.'}), 201


@app.route('/api/login_with_email', methods=['POST'])
def login_with_email():
    data = request.get_json()
    user = db.find_user_by_email(data['email'])

    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'error': 'Invalid login credentials.'}), 401

    json_web_token = auth.create_token(str(user['_id']))

    user_data = {
        'firstName': user['firstName'],
        'lastName': user['lastName'],
        'email': user['email'],
        'jwt': json_web_token,

    }

    return jsonify({'user_data': user_data}), 200


@app.route('/api/update_user_rfw', methods=['POST'])
def update_user_rfw():
    data = request.get_json()
    if not data or 'email' not in data or 'score' not in data:
        return jsonify({'error': 'Missing email or score in request'}), 400

    user = db.find_user_by_email(data['email'])
    if not user:
        return jsonify({'error': 'Invalid login credentials.'}), 401

    token = None
    authorization_header = request.headers.get('Authorization')
    if authorization_header:
        parts = authorization_header.split(" ")
        if len(parts) == 2:
            token = parts[1]

    if not token or not auth.verify_token(token):
        return jsonify({'error': 'Invalid or missing token'}), 401

    update_data = {'rfwScore': data['score']}
    db.update_user(data['email'], update_data)

    return jsonify({'message': 'User updated successfully'}), 200


@app.route('/api/link_to_bank', methods=['POST'])
def link_to_bank():
    data = request.get_json()
    if not data or 'email' not in data:
        return jsonify({'error': 'Missing email in request'}), 400

    user = db.find_user_by_email(data['email'])

    if not user:
        return jsonify({'error': 'Invalid login credentials'}), 401

    link = json.loads(api_core_instance.create_auth_link(user['basiqAccount'], access_token)).get('links').get('public')

    return jsonify({'link': link}), 200


@app.route('/api/update_user_income_and_expenditure', methods=['POST'])
def update_user_income_and_expenditure():
    data = request.get_json()
    if not data or 'email' not in data:
        return jsonify({'error': 'Missing email in request'}), 400

    user = db.find_user_by_email(data['email'])

    if not user:
        return jsonify({'error': 'Invalid login credentials'}), 401

    token = None
    authorization_header = request.headers.get('Authorization')
    if authorization_header:
        parts = authorization_header.split(" ")
        if len(parts) == 2:
            token = parts[1]

    if not token or not auth.verify_token(token):
        return jsonify({'error': 'Invalid or missing token'}), 401

    tran_data = json.loads(api_data_instance.get_transactions(user['basiqAccount'], access_token))
    transaction_df = API_Converter.convert_basiq_transactions_to_dataframe(tran_data)

    transaction_df['postDate'] = pd.to_datetime(transaction_df['postDate'])
    transaction_df['postDate'] = transaction_df['postDate'].dt.tz_localize(None)
    transaction_df['year_month'] = transaction_df['postDate'].dt.to_period('M')
    transaction_df['amount'] = pd.to_numeric(transaction_df['amount'], errors='coerce')
    latest_date = transaction_df['postDate'].max()
    six_months_ago = latest_date - pd.DateOffset(months=6)

    recent_transactions = transaction_df[transaction_df['postDate'] > six_months_ago].copy()
    recent_transactions['year_month'] = recent_transactions['postDate'].dt.to_period('M')

    def calculate_income(x):
        return x[x > 0].sum()

    def calculate_expenditure(x):
        return abs(x[x < 0].sum())

    monthly_summary = recent_transactions.groupby('year_month')['amount'].agg(
        Income=calculate_income,
        Expenditure=calculate_expenditure
    )
    df_reset = monthly_summary.reset_index()
    df_reset['Income'] = df_reset['Income'].round(2)
    df_reset['Expenditure'] = df_reset['Expenditure'].round(2)
    df_reset = df_reset.astype(str)
    json_result = df_reset.to_json(orient='records', date_format='iso')

    return jsonify({'data_set': json_result}), 200


@app.route('/api/update_user_d_cloud', methods=['POST'])
def update_user_d_cloud():
    data = request.get_json()
    if not data or 'email' not in data:
        return jsonify({'error': 'Missing email in request'}), 400

    user = db.find_user_by_email(data['email'])

    if not user:
        return jsonify({'error': 'Invalid login credentials'}), 401

    token = None
    authorization_header = request.headers.get('Authorization')
    if authorization_header:
        parts = authorization_header.split(" ")
        if len(parts) == 2:
            token = parts[1]

    if not token or not auth.verify_token(token):
        return jsonify({'error': 'Invalid or missing token'}), 401

    tran_data = json.loads(api_data_instance.get_transactions(user['basiqAccount'], access_token))
    transaction_df = API_Converter.convert_basiq_transactions_to_dataframe(tran_data)
    trans_data_with_level, trans_data_cluster = d_cloud_cluster(transaction_df)
    word_cloud_image = d_cloud_generate(trans_data_with_level, preprocess=False)

    return jsonify({'cluster': trans_data_cluster, 'image': word_cloud_image}), 200


@app.route('/api/get_user_rfw_score', methods=['POST'])
def get_user_rfw_score():
    data = request.get_json()
    if not data or 'email' not in data:
        return jsonify({'error': 'Missing email in request'}), 400

    user = db.find_user_by_email(data['email'])

    if not user:
        return jsonify({'error': 'Invalid login credentials'}), 401

    token = None
    authorization_header = request.headers.get('Authorization')
    if authorization_header:
        parts = authorization_header.split(" ")
        if len(parts) == 2:
            token = parts[1]

    if not token or not auth.verify_token(token):
        return jsonify({'error': 'Invalid or missing token'}), 401

    return jsonify({'score': user['rfwScore']}), 200


if __name__ == '__main__':
    app.run(debug=True, port=8080)
