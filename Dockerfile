FROM node:alpine as builder

COPY . .

RUN npm i && \
    npm run build-prod


FROM nginx:alpine

COPY --from=builder /dist/ble-light /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]