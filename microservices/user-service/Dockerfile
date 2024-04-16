# development stage
FROM node:18-alpine AS development

WORKDIR /usr/src/app
COPY package.json ./
RUN npm ci
COPY . .
RUN npm run build

# production stage
FROM base AS production

WORKDIR /usr/src/app
COPY package.json ./
RUN npm ci --prod 
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "./dist/main.js"]


