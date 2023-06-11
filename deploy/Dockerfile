FROM node:12.22.8-bullseye-slim

LABEL Naveed Masaud Butt <naveed.butt@coeus-solutions.de>

WORKDIR /app
COPY yarn.lock package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]