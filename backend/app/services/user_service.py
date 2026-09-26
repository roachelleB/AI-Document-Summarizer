from app.database.mongodb import database
from app.utils.security import hash_password, verify_password

users_collection = database["users"]

def create_user(name: str, email: str, password: str):
    hashed_password = hash_password(password)

    user = {
        "name": name,
        "email": email,
        "password_hash": hashed_password,
    }

    result = users_collection.insert_one(user)

    return {
        "id": str(result.inserted_id),
        "name": name,
        "email": email,
    }

def get_user_by_email(email: str):
    return users_collection.find_one({"email": email})

def authenticate_user(email: str, password: str):
    user = get_user_by_email(email)

    if not user:
        return None

    if not verify_password(password, user["password_hash"]):
        return None

    return user