FROM node:alpine as build

WORKDIR /app

COPY package.json ./

COPY prisma ./prisma/

RUN npm install && npx prisma generate && npx prisma migrate dev

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY package.json ./

COPY prisma ./prisma/

RUN npm install --only=production

COPY --from=build /app/dist ./dist

CMD npm run start:prod
