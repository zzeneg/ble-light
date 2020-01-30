FROM node:10-alpine as builder

WORKDIR /app

COPY . .

RUN npm i && \
    npm run build-prod


FROM nginx:alpine

COPY --from=builder /app/dist/ble-light /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]