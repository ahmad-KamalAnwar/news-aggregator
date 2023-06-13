FROM node:18.16-bullseye-slim

MAINTAINER Ahmad Kamal Anwar <ahmadkamalanwar.it@gmail.com>

WORKDIR /app
COPY yarn.lock package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
