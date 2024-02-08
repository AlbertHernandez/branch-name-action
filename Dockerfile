FROM node:10-alpine

COPY package*.json ./
RUN npm ci
COPY . .

ENTRYPOINT ["node", "/dist/index.js"]
