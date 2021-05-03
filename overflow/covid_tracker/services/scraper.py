from typing import Optional

from bs4 import BeautifulSoup

from overflow.covid_tracker.schemas import KZCovidTrackerResponse
from overflow.covid_tracker.services.web import Web
from settings import COVID_TRACKER_BASE_URL, COVID_NEWS_URL


class KZCovidTracker:
    def __init__(self):
        self.base_url = COVID_TRACKER_BASE_URL

    def get(self) -> Optional[KZCovidTrackerResponse]:
        response = Web.get(self.base_url)

        if response.status_code != 200:
            return

        data = response.json()
        return KZCovidTrackerResponse(**data)


class CovidNews:
    def __init__(self):
        self.base_url = COVID_NEWS_URL

    def pipeline(self):
        html = Web.get(self.base_url)
        soup = BeautifulSoup(html.content, "lxml")
        cards = soup.find_all("li", attrs={"class": "e57qer20"})

        for card in cards:
            _card = Card(html=card)
            _card.parse_photo()
            _card.parse_title()

            if _card.title is None:
                continue

            yield _card

    def scrape(self):
        return self.pipeline()


class Card:
    def __init__(self, html):
        self.html = html
        self.photo_src = None
        self.title = None
        self.content_link = None
        self.source = "BBC News"

    def as_json(self):
        return {
            "title": self.title,
            "photo": self.photo_src,
            "content_link": self.content_link,
            "source": self.source
        }

    def parse_title(self) -> None:
        child_1 = self.html.find("div", attrs={"data-e2e": "story-promo"})
        ltrs = child_1.find_all("div", attrs={"dir": "ltr"})

        content = ltrs[1].find("a")
        if content is None:
            return

        self.content_link = (
            content.get("href")
            if "https" in content.get("href")
            else "https://www.bbc.com" + content.get("href")
        )
        self.title = content.text.strip()

    def parse_photo(self) -> None:
        child_1 = self.html.find("div", attrs={"data-e2e": "story-promo"})
        ltrs = child_1.find_all("div", attrs={"dir": "ltr"})

        photo = ltrs[0].find("div", attrs={"data-e2e": "image-placeholder"})

        if photo is not None and photo.find("img") is not None:
            self.photo_src = photo.find("img").get("src")
            return

        self.photo_src = "https://picsum.photos/200"
