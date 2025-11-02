# Запуск в тестовом режиме

- создать файл .env из .env.example
- настроить переменные окружения в .env 
- запустить СУБД
```
npm install
docker compose up db -d
npx prisma migrate dev
npx prisma studio
```
- запустить приложение
```
npm run dev
```

## Запуск в режиме deploy

```
npm install
docker compose up db -d
npx prisma migrate deploy || npx prisma migrate dev
npm ci
npx prisma generate
npm run build
docker compose up --build -d
```

- Миграция и проверка статуса
```
docker compose exec app npx prisma migrate deploy
docker compose exec app npx prisma migrate status
```

## Используемые технологии
- docker
- postgres
### JS библиотеки и фреймворки
- prisma ORM
- Next.js
- react
- react-hook-form
- auth.js
- bcryptjs
