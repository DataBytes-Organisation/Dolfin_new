from pymongo import MongoClient
from werkzeug.security import generate_password_hash


class Database:
    def __init__(self, uri):
        self.client = MongoClient(uri)
        self.db = self.client['dolfin_database']
        self.users = self.db['users']

    def find_user_by_email(self, email):
        return self.users.find_one({'email': email})

    def add_user(self, user_data):
        user_data['password'] = generate_password_hash(user_data['password'])
        return self.users.insert_one(user_data)

    def update_user(self, email, update_data):
        if 'password' in update_data:
            update_data['password'] = generate_password_hash(update_data['password'])

        return self.users.update_one({'email': email}, {'$set': update_data})
