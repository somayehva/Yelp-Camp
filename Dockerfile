FROM node:alpine3.18
WORKDIR /usr/src/yelp-camp
COPY . .
RUN npm install
CMD ["node", "app.js"]
EXPOSE 3000