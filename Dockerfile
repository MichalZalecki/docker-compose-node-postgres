FROM node:10.15.0-alpine
EXPOSE 3000 9229
COPY . /home/app
WORKDIR /home/app
RUN npm install
CMD ./scripts/start.sh
