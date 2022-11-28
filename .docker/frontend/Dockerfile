FROM node:16.13.0-alpine3.12

ENV NODE_VERSION 14.18.1
ENV PATH $PATH:/home/node/.yarn/bin

USER node

WORKDIR /home/node/failure-story/frontend/app
RUN yarn global add firebase-tools

RUN chown -R node:node /home/node/failure-story/frontend/app
