import NextAuth from "next-auth"
import { CredentialsSignin, AuthError } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { object, string } from "zod"
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma/client"

// TODO
export type UserSession = {
  id: number
}

export class InvalidCredentialsError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}

// handlers - нужен для автоматичесской генерации  API
// signIn   - функция login
// signOut  - функция logout
// auth     - функция дающая доступ к объекту сессии, хранящему данные о пользователе 
export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    // обрабатывает авторизацию
    CredentialsProvider({
      // name: "Sign in",
      // id: "credentials",
      // Вы можете указать, какие поля должны быть представлены, добавив ключи к объекту "учетные данные".
      // например, домен, имя пользователя, пароль, токен 2FA и т.д.
      credentials: {
        email: {},
        password: {},
      },
      // обрабатывает попытку авторизоваться
      async authorize(credentials) {
        // console.log('**********authorize')
        // console.log(credentials)
        // console.log(credentials.email)
        // console.log(credentials.password)

        // Идентификация - логика для проверки существования пользователя
        const user = await prisma.user.findUnique({
          where: { email: String(credentials.email) },
        });
        if ( !user ) {
          // return null
          throw new InvalidCredentialsError('Пользователь не найден!')
        }

        // Аутентификация - логика для проверки пароля пользователя
        // @ts-ignore // TODO
        if ( !await bcrypt.compare(String(credentials.password), user.password) ) {
          // return null
          throw new InvalidCredentialsError('Не верный пароль!')
        }

        // возвращает объект пользователя с данными его профиля
        const { password, ...userData } = user
        return userData
      },
    }),
  ],
  callbacks: {
    // token
    // user -  то что возвращает CredentialsProvider.authorize 
    async jwt({ token, user }) {
      // console.log('**********jwt')
      // console.log('token')
      // console.log(token)
      // console.log('user')
      // console.log(user)
      if (user) token.user = user;
      return token;
    },
    // @ts-ignore // TODO
    async session({ token, session, user }) {
      // console.log('**********session')
      // console.log('token')
      // console.log(token)
      // console.log('session')
      // console.log(session)
      // console.log('user')
      // console.log(user)

      // session.user = token.user;
      // return session;
      // user = token?.user
      // {user, ...token} = token
      // return { token, session, user};
      return { token, session, user: token.user};
    },
  },
})


// регистрация юзера + хеширование пароля
export async function registerUser({email, password}:{email: string, password: string}) {
  let user = await prisma.user.findUnique({
    where: {email},
  }) 
  if (user) throw new Error('Этот email уже занят')
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });
  return user;
}

// // авторизация
// export async function authorization(credentials){

//   // проверка формата входящих данных
//   // try {
//   //   const { email, password } = await signInSchema.parseAsync(credentials)
//   // } catch (new Error) { return null }

//   // Идентификация - логика для проверки существования пользователя
//   const user = await prisma.user.findUnique({
//     where: { email: String(credentials.email) },
//   });
//   if ( !user ) throw new Error('Пользователь не найден!')

//   // Аутентификация - логика для проверки пароля пользователя
//   if ( !await bcrypt.compare(String(credentials.password), user.password) ) {
//     throw new Error('Не верный пароль!')
//   }

//   // возвращает объект пользователя с данными его профиля
//   const { password, ...userData } = user
//   return userData
// }


// Идентификация - логика для проверки существования пользователя
// export async function identification(userData){
//   let user = await prisma.user.findUnique({
//     where: userData,
//   }) 
//   return user
// }

// Аутентификация - логика для проверки пароля пользователя
// export async function authentication(password, user){
//   let res = await bcrypt.compare(String(password), user.password)
//   return res
// }


// // валидация входящих credentials
// export const signInSchema = object({
//   email: string({ required_new Error: "Email is required" })
//     .min(1, "Email is required")
//     .email("Invalid email"),
//   password: string({ required_new Error: "Password is required" })
//     .min(1, "Password is required")
//     .min(8, "Password must be more than 8 characters")
//     .max(32, "Password must be less than 32 characters"),
// })

