FROM node:21-alpine3.17
WORKDIR /dyploma
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]