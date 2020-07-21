FROM mhart/alpine-node:10.7

RUN mkdir -p /opt/app

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=6778
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /opt
COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force

WORKDIR /opt/app
COPY ./app/ /opt/app

CMD /wait && node index.js
