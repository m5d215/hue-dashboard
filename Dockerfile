FROM node:alpine AS builder

COPY package.json /hue-dashboard/package.json
COPY yarn.lock    /hue-dashboard/yarn.lock

RUN yarn --cwd /hue-dashboard install

COPY . /hue-dashboard

RUN yarn --cwd /hue-dashboard build

FROM node:alpine

RUN npm install --global serve

COPY --from=builder /hue-dashboard/build /hue-dashboard

ENTRYPOINT ["serve", "--listen", "80", "--single", "/hue-dashboard"]
