import {prisma} from '@/lib/prisma/client'

import { registerUser } from '@/config/auth'
// import bcrypt from "bcryptjs";
// // регистрация юзера + хеширование пароля
// export async function registerUser({email, password}:{email: string, password: string}) {
//   let user = await prisma.user.findUnique({
//     where: {email},
//   })
//   if (user) throw new Error('Этот email уже занят')
//   const hashedPassword = await bcrypt.hash(password, 10);
//   user = await prisma.user.create({
//     data: { email, password: hashedPassword },
//   });
//   return user;
// }


export async function POST(request: Request){
  const data = await request.json()
  // console.log(data)
  try {
    let user = await registerUser({email: data.email, password: data.password})
    return Response.json(user)
  } catch (error) {
    // @ts-ignore // TODO
    return Response.json({error: error?.message})
  }
}
