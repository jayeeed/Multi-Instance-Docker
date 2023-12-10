# Stage 1: Build React App
FROM node:20.9.0 as react-builder

WORKDIR /app/front

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npx", "vite"]

# RUN npx vite build

# # Stage 2: Final Image
# FROM nginx:1.25.3-alpine

# WORKDIR /usr/share/nginx/html

# COPY --from=react-builder /app/front/dist .

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
