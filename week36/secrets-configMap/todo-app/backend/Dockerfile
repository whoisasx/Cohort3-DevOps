FROM oven/bun:1

WORKDIR /app

COPY package.* ./

RUN bun install

COPY ./ ./

CMD [ "bun","index.ts" ]