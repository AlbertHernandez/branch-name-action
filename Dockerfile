FROM node:current-alpine3.19

WORKDIR /home

COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build

ENTRYPOINT ["node"]
