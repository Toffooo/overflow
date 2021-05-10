from http import HTTPStatus
from typing import List, Optional, Union

from fastapi import APIRouter

from overflow.covid_tracker.schemas import (
    City,
    Country,
    KZCovidTrackerResponse,
    New,
    Place,
)
from overflow.covid_tracker.services.scraper import KZCovidTracker
from overflow.database.models import Post

COVID = APIRouter()
tracker = KZCovidTracker()


@COVID.get(
    "/covid",
    status_code=HTTPStatus.OK,
    response_model=Union[Country, City, List[City], KZCovidTrackerResponse],
    tags=["Covid"],
)
async def get_covid(tp: Optional[str] = ""):
    data = tracker.get()

    if tp == "":
        return data
    elif tp == "country":
        return data.country
    elif tp == "cities":
        return data.cities

    return data.where(cities__name=tp)


@COVID.get(
    "/covid/time_period",
    status_code=HTTPStatus.OK,
    response_model=List[Place],
    tags=["Covid"],
)
async def get_infected_data_by_time_period(date: int):
    data = tracker.get()
    return data.get_by_time_period(date=date)


@COVID.get(
    "/covid/places",
    status_code=HTTPStatus.OK,
    response_model=List[Place],
    tags=["Covid"],
)
async def get_covid_places(city: Optional[str] = ""):
    data = tracker.get()
    return data.get_places(city=city)


@COVID.get(
    "/covid/news",
    status_code=HTTPStatus.OK,
    response_model=List[New],
    tags=["Covid"],
)
async def get_covid_news():
    return Post.all()
