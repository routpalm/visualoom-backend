FROM node:20
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./server ./server
COPY ./tests/ ./tests
COPY ./bash/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
EXPOSE 3001
CMD ["node", "./server/index.js"]
