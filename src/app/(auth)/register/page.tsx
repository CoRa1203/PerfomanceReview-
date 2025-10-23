'use client'

//TODO 
//TODO убирать ошибку когда редактируешь данные
//TODO подсвечивать поле pass2 когда пароль отличаются
//TODO ? переделать все на ручное управление без useForm? 
//TODO isLoading

import { useState, useRef, useEffect, useMemo } from 'react'
import { Input, Button, Alert } from '@heroui/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'


async function createUserAPI(userData: { email: string, password: string }){
  // const BASE_URL = process.env.NEXT_PUBLIC_HOST  
  const url = process.env.NEXT_PUBLIC_HOST + '/api/auth'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'json',
    },
    body: JSON.stringify(userData)
  })
  if (response.ok) {
    const data = await response.json()
    if(data.error) {
      throw new Error(data.error)
    } else {
      return data
    }
  } else {
    throw new Error('Что-то пошло не так...')
  }
}

type Form = {
  email: string
  password: string 
  password2: string
}

export default function Register(){
  const router = useRouter()
  const [ error, setError ] = useState<string>()
  const { register, handleSubmit } = useForm<Form>()
  // const refPassword2 = useRef(null)
  
  async function handleForm(formData: Form){
    setError('')
    // console.log(formData)

    // проверка паролей
    if (formData.password !== formData.password2) {
      setError('Пароли не совпадают') 
      console.log('Пароли не совпадают')
      return
    }

    const credentials = {
      email:    formData.email,
      password: formData.password,
    }

    // создание пользователя // отправка данных на сервер 
    createUserAPI(credentials)
    .then((res) => { 
      console.log(res)
      // вход в аккаунт
      signIn('credentials', {...credentials, redirect: false })
      // редирект 
      router.push('/profile') 
    })
    .catch((error) => { setError(error.message) })

  }

  return <div className='w-80 m-auto mt-10'>
    {error ? <Alert color="danger" className=" mb-2" > {error} </Alert> : <></>}

    <form onSubmit={handleSubmit(handleForm)} className=" *:mb-2">

      <Input type="email" {...register('email')} label="email" />
      <Input type="password" {...register('password')} label="Пароль" />
      <Input type="password" {...register('password2')} label="Повторите пароль" />

      <Button type="submit" className='w-80' > Создать профиль </Button>
    </form>
  </ div>  
}
