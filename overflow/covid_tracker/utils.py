import datetime


def to_datetime(date):
    if isinstance(date, int):
        return datetime.datetime.fromtimestamp(date)
    elif "." in date:
        date = date.split(".")[0].strip()

    return datetime.datetime.fromtimestamp(
        int(datetime.datetime.strptime(date, "%Y-%m-%dT%H:%M:%S").strftime("%s"))
    )
