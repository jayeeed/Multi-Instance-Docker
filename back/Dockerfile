# Stage 1: Build Flask App
FROM python:3.11.4 as flask-builder

WORKDIR /app/back

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Stage 2: Final Image
FROM python:3.11.4

WORKDIR /app/back

COPY --from=flask-builder /app/back /app/back

RUN pip install --no-cache-dir -r requirements.txt

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 5000

CMD ["python", "-m", "flask", "run"]
