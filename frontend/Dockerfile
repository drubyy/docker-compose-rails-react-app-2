# base image
FROM node:alpine
WORKDIR /frontend

COPY package*.json ./
RUN npm install
RUN chown -R node.node /frontend
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
 