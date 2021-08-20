FROM node:14-alpine
WORKDIR /home/prasad/projects/codedesignlabs_node/backend
COPY . .
RUN npm install && npm install typescript -g
RUN tsc -p tsconfig.json
EXPOSE 3000
CMD [ "node", "dist/index.js" ]