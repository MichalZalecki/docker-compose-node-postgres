FROM node:10.15.0-alpine
EXPOSE 8080 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm ci

COPY . /home/app

RUN npm run migrations

RUN npm run dev