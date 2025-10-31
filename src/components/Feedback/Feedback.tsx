'use client'

import { Feedback } from '@prisma/client'
import Link from "next/link"


export default function FeedbackPage({feedback}: {feedback: Feedback}){
  
  return <>
  <Link href={``} className=" *:mb-2 ">
    <h1 className='text-2xl'>Обратная связь</h1>
    <p>{feedback.result}</p>
      <p>{feedback.response}</p>
  </Link>
  </>
}
