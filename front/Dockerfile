# Stage 1: Build React App
FROM node:20.9.0 as react-builder

WORKDIR /app/front

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npx", "vite", "--host"]
