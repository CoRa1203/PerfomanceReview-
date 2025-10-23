'use client'
import React, { useState, useEffect } from 'react'
import { Link, Input, Button, Alert } from '@heroui/react'
import { useForm } from 'react-hook-form'
// import { signIn } from '@/auth' //  серверный
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

type Form = {
  email: string
  password: string
}

export default function Login(){
  const [ error, setError ] = useState<string>()
  const { register, handleSubmit  } = useForm<Form>()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/profile' || '/'
  const router = useRouter()

  async function handleForm(formData: {email: string, password: string}){
    const response = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    })
    if (response?.error){
      // setError(response.error)  //  пока не получилось пробросить ошибки
      setError('Проверьте логин и пароль!')
    } else {
      router.push(callbackUrl)
      // router.back()  // редирект на предыдущую страницу // из кеша
    }
    // if (response?.ok) {
    //   router.back()  // редирект на предыдущую страницу
    // } else {
    //   setError('Проверьте логин и пароль!')
    // }
  }

  return ( 
  <div className='m-auto w-80 mt-20'>
    { error ? <Alert color="danger" className=" mb-2 " >{error}</Alert> : <></> }

    <form onSubmit={handleSubmit(handleForm)} className=" *:mb-2 " >
      <Input  type='email'     {...register('email')} />
      <Input  type='password'  {...register('password')} />
      <Button type='submit' className='w-80' > Войти </Button>
    </form>  
    
    <Button className=" w-80 mb-2"
      onPress={()=>{ router.push('/register') }}
    > Зарегистрироваться </Button>
  </div>
  )
}