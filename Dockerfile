# Stage 1: Build React App
FROM node:20.9.0 as react-builder

WORKDIR /app

COPY front/package.json .
COPY front/package-lock.json .

RUN npm install

COPY front .

RUN npx vite build

# Stage 2: Build Flask App
FROM python:3.11.4 as flask-builder

WORKDIR /app

COPY back/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY back .

# Stage 3: Final Image
FROM python:3.11.4

WORKDIR /app

COPY --from=flask-builder /app /app
COPY --from=react-builder /app/build /app/front/build

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 5000

CMD ["flask", "run"]
