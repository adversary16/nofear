FROM node:17
RUN apt-get update && apt-get upgrade -y
WORKDIR /app
COPY . /app/
RUN npm i

CMD ["npm", "run", "start"]