FROM mhart/alpine-node:10.7

RUN mkdir -p /opt/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=6775

ARG PORT=6775
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /opt
COPY package.json package-lock.json ./
RUN npm install --only=prod && npm cache clean --force

WORKDIR /opt/app
COPY ./app/ /opt/app

CMD [ "node", "index.js" ]