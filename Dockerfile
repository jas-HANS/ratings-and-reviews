FROM node:12.18.3-alpine

RUN mkdir -p /dist/reviews

WORKDIR /dist/reviews

COPY . /dist/reviews

RUN npm install

RUN npm run build

RUN cd server && npm install

EXPOSE 3001

CMD ["npm", "run", "server"]
