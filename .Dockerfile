
FROM node:12.10

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

RUN node_modules/.bin/sequelize db:migrate

ENV NODE_ENV=development

RUN npm run dev

EXPOSE 8080