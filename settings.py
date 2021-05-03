from decouple import config


class CeleryConfig:
    broker_url = "redis://localhost"
    backend = "redis://localhost"
    RESULT_BACKEND = "redis://localhost"
    ACCEPT_CONTENT = ["application/json"]
    RESULT_SERIALIZER = "json"
    TASK_SERIALIZER = "json"
    TIMEZONE = "Asia/Almaty"
    BEAT_SCHEDULE = {
        "amount-counting": {
            "task": "profile.tasks.amount_counting",
            "schedule": 60.0,
        },
    }


class CeleryConfigDocker:
    broker_url = "redis://redis:6379/0"
    backend = "redis://redis:6379/0"
    RESULT_BACKEND = "redis://redis:6379/0"
    ACCEPT_CONTENT = ["application/json"]
    RESULT_SERIALIZER = "json"
    TASK_SERIALIZER = "json"
    TIMEZONE = "UTC"

    # TODO: Fix beat work in the docker
    # beat_schedule = {
    #     "posts-record": {
    #         "task": "",
    #         "schedule": 10,
    #     },
    # }


DATABASE_URL = config("DATABASE_URL", cast=str)
COVID_TRACKER_BASE_URL = config("COVID_TRACKER_BASE_URL", cast=str)
COVID_NEWS_URL = config("COVID_NEWS_URL", cast=str)
