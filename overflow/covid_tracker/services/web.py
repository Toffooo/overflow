import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

HEADERS = {
    "Accept": "*/*",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/84.0.4147.135 Mobile Safari/537.36",
}


class Web:
    @staticmethod
    def requests_retry_session(
        retries=3,
        backoff_factor=0.3,
        status_forcelist=(500, 502, 504),
        session=None,
    ):
        session = session or requests.Session()
        retry = Retry(
            total=retries,
            read=retries,
            connect=retries,
            backoff_factor=backoff_factor,
            status_forcelist=status_forcelist,
        )
        adapter = HTTPAdapter(max_retries=retry)
        session.mount("http://", adapter)
        session.mount("https://", adapter)
        return session

    @staticmethod
    def get(url: str) -> requests.Response:
        with requests.Session() as session:
            session.headers.update(HEADERS)
            response = Web.requests_retry_session(session=session).get(url=url)

        return response

    @staticmethod
    def post(url: str) -> requests.Response:
        with requests.Session() as session:
            session.headers.update(HEADERS)
            response = Web.requests_retry_session(session=session).post(url=url)

        return response
