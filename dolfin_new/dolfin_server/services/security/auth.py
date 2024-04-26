import jwt
import datetime


class JWTManager:
    def __init__(self, secret_key, algorithm='HS256'):
        self.secret_key = secret_key
        self.algorithm = algorithm

    def create_token(self, user_id, expires_in_hours=1):
        payload = {
            'user_id': user_id,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=expires_in_hours),
            'iat': datetime.datetime.now(datetime.timezone.utc)
        }
        token = jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
        return token

    def verify_token(self, token):
        try:
            jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return True
        except jwt.ExpiredSignatureError:
            return False
        except jwt.InvalidTokenError:
            return False
