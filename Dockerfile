
FROM node:8

# Set the working directory to /app
RUN mkdir /app

ADD . /app

WORKDIR /app

RUN npm install

EXPOSE 3004

CMD ["node", "server/server.js"]

