import pymysql
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

from settings import DATABASE_URL

pymysql.install_as_MySQLdb()
engine: sqlalchemy.engine.base.Engine = create_engine(
    DATABASE_URL, pool_recycle=299, pool_timeout=20
)
session_factory: sqlalchemy.orm.session.sessionmaker = sessionmaker(
    autocommit=True, autoflush=False, bind=engine
)
session = scoped_session(session_factory)

base = declarative_base()
