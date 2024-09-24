FROM node:18-alpine AS dependencies

WORKDIR /app

COPY package.json ./

RUN yarn install

FROM dependency AS test

RUN yarn test

FROM dependencies AS build

ARG env

ENV ENV $env

COPY . .

RUN Docker/build.sh 

FROM build AS production_deps

RUN rm -rf node_modules

RUN yarn install --production

FROM gcr.io/distroless/nodejs18-debian11 AS release

WORKDIR /app

COPY --from=build /server/dist ./dist

COPY --from=build /server/package.json ./package.json

COPY --from=production_deps /server/node_modules ./node_modules

COPY --from=build /server/.env ./.env

USER 1000

EXPOSE 3000

CMD ["./dist/src/app.js"]