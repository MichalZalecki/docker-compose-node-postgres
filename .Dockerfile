
FROM node:12.10

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

ENV NODE_ENV=development

EXPOSE 4000

RUN node_modules/.bin/sequelize db:migrate

CMD [ "npm", "run", "dev"]