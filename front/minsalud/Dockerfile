FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/front
WORKDIR /srv/app/front

COPY package.json /srv/app/front
COPY package-lock.json /srv/app/front

RUN npm install

COPY . /srv/app/front

CMD ["npm","start"]