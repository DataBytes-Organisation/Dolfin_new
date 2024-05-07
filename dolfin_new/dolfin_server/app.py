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

load_dotenv()
app = Flask(__name__)
CORS(app)
mongodb_uri = os.environ.get('MONGODB_URI', 'mongodb://localhost:27017/')
db = Database(mongodb_uri)
auth = JWTManager(os.environ.get('SECRET_KEY', 'default_secret_key'))
api_core_instance = API_Core(os.environ.get("API_KEY"))
api_data_instance = API_Data()
access_token = api_core_instance.generate_auth_token()


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


if __name__ == '__main__':
    app.run(debug=True)
