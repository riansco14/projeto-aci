from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.database import get_db
from repositories import user_repository
from schemas.user import UserCreate, UserLogin, UserResponse
from utils.auth_utils import verificar_token
from utils.utils import hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/user-info", response_model=UserResponse)
def user_info(db: Session = Depends(get_db), user_id = Depends(verificar_token)):
    db_user = user_repository.get_user_by_id(db, user_id)
    return db_user

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if user_repository.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email já registrado")

    hashed_pwd = hash_password(user.senha)
    return user_repository.create_user(db, user, hashed_pwd)

@router.post("/login", response_model=UserResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = user_repository.get_user_by_email(db, user.email)
    if not db_user or not verify_password(user.senha, db_user.senha):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    return db_user