FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/back
WORKDIR /srv/app/back

COPY package.json /srv/app/back
COPY package-lock.json /srv/app/back

RUN npm install

COPY . /srv/app/back
CMD ["npm","run","dev"]