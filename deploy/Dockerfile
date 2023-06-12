FROM node:16.10-bullseye-slim

LABEL Ahmad Kamal Anwar <ahmadkamalanwar.it@gmail.com>

WORKDIR /app
COPY yarn.lock package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
