from sqlalchemy import Column, Integer, String
from sqlalchemy_mixins import AllFeaturesMixin, TimestampsMixin

from overflow.covid_tracker.services.scraper import Card

from .conf import base, engine, session


class BaseModel(base, AllFeaturesMixin, TimestampsMixin):
    __abstract__ = True

    id = Column(Integer, autoincrement=True, primary_key=True)

    def __init__(self, *args, **kwargs):
        pass


class Post(BaseModel):
    __tablename__ = "posts"

    title = Column(String(length=255))
    photo = Column(String(length=255))
    content_link = Column(String(length=255))
    source = Column(String(length=255))

    @classmethod
    def update_or_create(cls, card: Card) -> 'Post':
        post = cls.where(title=card.title).all()
        if len(post) == 0:
            post = cls.create(**card.as_json())
        else:
            post = post[0]
            post.fill(**card.as_json())
            post = post.update()

        return post[0] if isinstance(post, list) else post


base.metadata.create_all(engine)
BaseModel.set_session(session)
