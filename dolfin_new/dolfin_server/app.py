from flask import Flask, request, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
mongodb_uri = os.environ.get('MONGODB_URI', 'mongodb://localhost:27017/')
client = MongoClient(mongodb_uri)
db = client.dolfin_database
users = db.users


@app.route('/create_new_user', methods=['POST'])
def create_new_user():
    data = request.get_json()
    user = users.find_one({'email': data['email']})

    if user:
        return jsonify({'success': False, 'message': 'Email already exists.'}), 409

    hashed_password = generate_password_hash(data['password'])

    users.insert_one({
        'firstName': data['firstName'],
        'lastName': data['lastName'],
        'email': data['email'],
        'password': hashed_password,
    })

    return jsonify({'success': True, 'message': 'User created successfully.'}), 201


@app.route('/login_with_email', methods=['POST'])
def login_with_email():
    data = request.get_json()
    user = users.find_one({'email': data['email']})

    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'error': 'Invalid login credentials.'}), 401

    user_data = {
        'firstName': user['firstName'],
        'lastName': user['lastName'],
        'email': user['email']
    }

    return jsonify({'user_data': user_data}), 200


if __name__ == '__main__':
    app.run(debug=True)
