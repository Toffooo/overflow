from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .covid_tracker.api.web import COVID

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=COVID, prefix="/api/v1")
