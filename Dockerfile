FROM node:10.16-alpine
# Basic setup
ARG APP_DIR=/usr/src/app
WORKDIR $APP_DIR
RUN apk update --quiet && \
    apk add git build-base python --quiet

# Install necessary modules
COPY package*.json  $APP_DIR/
RUN npm i --quiet
COPY . .

CMD ["npm", "start"]
