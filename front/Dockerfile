FROM node:17

RUN apt-get update && apt-get upgrade -y
WORKDIR /app
COPY . /app/
RUN npm i
RUN npm run build

CMD [ "npm", "run", "start"]