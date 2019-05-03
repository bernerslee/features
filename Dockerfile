FROM node:8.0

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm install
RUN npm install knex -g

EXPOSE 3003

CMD ["node", "server/index.js"]


