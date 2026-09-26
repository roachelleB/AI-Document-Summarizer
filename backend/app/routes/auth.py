from fastapi import APIRouter
from app.models.user import UserCreate, UserLogin
from app.services.user_service import (
    create_user,
    get_user_by_email,
    authenticate_user
)
from app.utils.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup")
def signup(user: UserCreate):
    existing_user = get_user_by_email(user.email)

    if existing_user:
        return {"message": "User already exists"}

    new_user = create_user(
        user.name,
        user.email,
        user.password
    )

    return {
        "message": "User created successfully",
        "user": new_user
    }

@router.post("/login")
def login(user: UserLogin):
    authenticated_user = authenticate_user(
        user.email,
        user.password
    )

    if not authenticated_user:
        return {"message": "Invalid email or password"}

    access_token = create_access_token(
        str(authenticated_user["_id"])
        )
    
    return {
        "message": "Login successful",
        "access_token": access_token,
        "user": {
        "id": str(authenticated_user["_id"]),
        "name": authenticated_user["name"],
        "email": authenticated_user["email"]
        }
        }