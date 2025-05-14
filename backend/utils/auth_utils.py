from fastapi import Depends, HTTPException, Header, status
from sqlalchemy.orm import Session

from config.database import get_db
from repositories.user_repository import get_user_by_id


def verificar_token(authorization: str = Header(...), db: Session = Depends(get_db)):
    user = get_user_by_id(db, authorization)

    if not authorization or not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido"
        )
    return authorization