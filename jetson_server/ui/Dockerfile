FROM  python:3.6
ENV PYTHONUNBUFFERED 0

COPY ./src/requirements.txt /tmp
RUN pip install -r /tmp/requirements.txt

WORKDIR /app

EXPOSE 5000
CMD python jetson_server.py
