# Stage 1: Build React App
FROM node:20.9.0 as react-builder

WORKDIR /app/front/

COPY front/package.json front/package-lock.json ./

RUN npm i

COPY . .

RUN npx vite build

# Stage 2: Backend
FROM python:3.11.4

WORKDIR /app/back

COPY back/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Copy built frontend from the previous stage
COPY --from=react-builder /app/front/dist /app/back/front/dist

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 5000

CMD ["python", "-m", "flask", "run"]
