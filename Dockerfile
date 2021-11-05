FROM node:slim
WORKDIR /usr/src/app
ENV WELCOME_MESSAGE="Welcome to Vietnam i have update version 2.0.1"
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 4000
CMD ["yarn", "start"]
