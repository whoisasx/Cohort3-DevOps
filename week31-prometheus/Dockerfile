FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install --save-dev typescript

COPY . .

CMD [ "npm","run","dev" ]