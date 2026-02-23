FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm ci --production --legacy-peer-deps

EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]