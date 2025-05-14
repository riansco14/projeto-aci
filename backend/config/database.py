import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

base_wta = "sqlite:///" + os.path.join(os.path.dirname(__file__), "../database_backend.db")


engine = create_engine(base_wta, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency de sessão do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
