from sqlalchemy import update
from sqlalchemy.orm import Session

from models.user import User
from schemas.user import UserCreate


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, id: str) -> User | None:
    return db.query(User).filter(User.id == id).first()

def add_tokens_in_user(db: Session, user_id: int, qntd_tokens_prompt: int) -> User | None:
    db.query(User).filter(User.id == user_id).update(
        {User.qntd_tokens: User.qntd_tokens + qntd_tokens_prompt},
        synchronize_session=False
    )
    db.commit()
    return db.get(User, user_id)

def create_user(db: Session, user: UserCreate, hashed_password: str) -> User:
    db_user = User(
        email=user.email,
        nome=user.nome,
        senha=hashed_password,
        qntd_tokens=0
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
