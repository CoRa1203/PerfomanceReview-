# Запуск в тестовом режиме

- создать файл .env из .env.example
- запустить СУБД
```
docker run --name db_pr -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres_pass -e POSTGRES_DB=data -d postgres
npx prisma migrate dev
npx prisma studio
```
- запустить приложение
```
hostname -I
npm run dev -H 172.17.0.1
```


## Используетые технологии
- docker
- postgres
### JS библиотеки и фреймворки
- prisma ORM
- Next.js
- react
- react-hook-form
- auth.js
- bcryptjs
