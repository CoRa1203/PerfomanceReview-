FROM node:20-bookworm

WORKDIR /app

COPY . .

RUN if [ ! -d "node_modules/.prisma/client" ]; then npx prisma generate; fi

EXPOSE 3000


CMD ["npm", "start"]
