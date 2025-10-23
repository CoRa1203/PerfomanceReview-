// 'use client'
import { signIn } from "@/config/auth"
import NextLink from 'next/link'
// import { Link } from '@heroui/react'

export function SignIn() {
  let error = ''

  return <>
    <form
      action={async (formData) => {
        "use server"
        // await signIn("credentials", formData)
        try {
          await signIn("credentials", formData)
        } 
        catch (error) {
          // @ts-ignore // TODO
          console.log(error.message)
          // @ts-ignore // TODO
          error = error.message
        }
      }}
    >
      { error ? <p>{error}</p> : <></>} 
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>

    <NextLink href="/auth/register" > Зарегистрироваться  </NextLink>
  </>
}