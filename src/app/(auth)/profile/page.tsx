'use client'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { Button } from '@heroui/button'


export default function ProfileTest(){
  const session = useSession()
  const userId = session.data?.user?.id
  console.log(session)

  return <>
    <p>ProfileTest Client</p>
    <p>{userId}</p>
    <Button onClick={signOut} >Выйти</Button>
  </>
}


// import { auth } from "@/config/auth";


// export default async function ProfileTest(){
//   const session = await auth()
//   const userId = session?.user?.id
//   console.log(session)

//   return <>
//     <p>ProfileTest Server</p>
//     <p>{userId}</p>
//   </>
// }
