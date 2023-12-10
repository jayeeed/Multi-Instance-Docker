# Stage 1: Build React App
FROM node:20.9.0 as react-builder

WORKDIR /app/front

COPY front/package.json front/package-lock.json ./

RUN npm install

COPY front .

RUN npx vite build

# Stage 2: Build Flask App
FROM python:3.11.4 as flask-builder

WORKDIR /app/back

COPY back/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY back .

# Stage 3: Final Image
FROM python:3.11.4

WORKDIR /app/back

COPY --from=flask-builder /app/back /app/back
COPY --from=react-builder /app/front/dist /app/back/static

RUN pip install --no-cache-dir -r requirements.txt

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 5000

CMD ["python", "-m", "flask", "run"]
