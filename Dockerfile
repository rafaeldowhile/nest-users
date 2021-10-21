# Use an existing docker image as a base
FROM node:14.17.5

WORKDIR /usr/app

# Install dependencies
COPY ./ ./
RUN npm install

# Default command
CMD ["npm", "run", "start:dev"]