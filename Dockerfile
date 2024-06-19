FROM node:latest as node

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN yarn

COPY . ./

RUN yarn build

EXPOSE 4000

CMD ["node", "./dist/server.js"]
