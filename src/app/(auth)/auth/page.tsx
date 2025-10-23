'use client'
// import Link from 'next/link'
import { Link } from '@heroui/react'
// import { MessagePage } from '~ui/MessagePage'

export default function Test(){
  // <MessagePage>
  return (
  <p>
    <Link
      href="/login"
      >
      Войдите 
    </Link> 
    <span> или </span>
    <Link
      href=""
      >
      обновите страницу 
    </Link> 
  </p>
  )
  // </MessagePage>
}


