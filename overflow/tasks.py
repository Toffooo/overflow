import logging

from celery import Celery
from pymysql.err import OperationalError as PyMySQLOperationalError
from sqlalchemy.exc import OperationalError

from settings import CeleryConfigDocker

from .covid_tracker.services.scraper import CovidNews
from .database.models import Post

news = CovidNews()
app = Celery("tasks")
app.config_from_object(CeleryConfigDocker)
logger = logging.getLogger(__name__)


@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Calls record_posts() every 10 seconds.
    sender.add_periodic_task(4200.0, record_posts.s(), name="add every 4200")


@app.task(
    name="record_posts", autoretry_for=(PyMySQLOperationalError, OperationalError)
)
def record_posts():
    for card in news.scrape():
        post = Post.update_or_create(card)
        logger.info(f"RECORDED POST - {post.title[:30]}...")
