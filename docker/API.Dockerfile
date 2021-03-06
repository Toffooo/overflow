FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

COPY ./ /app
EXPOSE 2100

RUN pip install -r requirements.txt

CMD uvicorn overflow.api:app --host 0.0.0.0 --port 2100