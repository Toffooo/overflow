from typing import List

from pydantic import BaseModel, validator
from sqlalchemy.orm import Query

from .utils import to_datetime


class OrmBase(BaseModel):
    @validator("*", pre=True)
    def evaluate_lazy_columns(cls, v):  # noqa
        if isinstance(v, Query):
            return v.all()
        return v

    class Config:
        arbitrary_types_allowed = True
        orm_mode = True


class New(OrmBase):
    id: int
    title: str
    photo: str
    content_link: str
    source: str


class Country(OrmBase):
    name: str
    longitude: float
    latitude: float
    infected: int
    recovered: int
    deaths: int
    updated: str


class City(OrmBase):
    id: int
    name: str
    longitude: float
    latitude: float
    infected: int
    recovered: int
    deaths: int
    radius: int


class Place(OrmBase):
    id: int
    name: str
    longitude: float
    latitude: float
    infected: int
    recovered: int
    deaths: int
    updated: str
    radius: int
    cityId: int


class KZCovidTrackerResponse(OrmBase):
    country: Country
    cities: List[City]
    places: List[Place]

    def get_by_time_period(self, date: int) -> list:
        result = []
        for data in self.places:
            updated_time = to_datetime(data.updated)
            search_time = to_datetime(date)

            if (
                updated_time.day != search_time.day
                or updated_time.year != search_time.year
                or updated_time.month != search_time.month
            ):
                continue

            result.append(data)

        return result

    def where(self, **kwargs):
        for field, value in kwargs.items():
            _field = field.split("__")[0]
            _attr = field.split("__")[1]

            for obj in getattr(self, _field):
                if getattr(obj, _attr) == value:
                    return obj

    def get_places(self, city: str):
        places = []
        _city = [e for e in self.cities if e.name == city]
        if len(_city) == 0:
            return None

        _city = _city[0]

        for place in self.places:
            if place.cityId != _city.id:
                continue

            places.append(place)

        return places
