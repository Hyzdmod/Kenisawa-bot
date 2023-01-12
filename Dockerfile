FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  sqlite \
  git \
  python \
  make \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN npm install sqlite3 --build-from-source --sqlite=/data/data/com.termux/files/usr/bin/sqlite3

COPY . .

EXPOSE 5000/tcp

CMD ["npm", "start"]
