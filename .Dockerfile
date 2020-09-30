
FROM node:12.10

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

ENV NODE_ENV=test

EXPOSE 4000

CMD [ "npm", "test" ]