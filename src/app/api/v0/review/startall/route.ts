import {prisma} from '@/lib/prisma/client'
import { ReviewPOST } from '@/types'


export async function POST(request: Request){
  throw new Error(' Метод начала массового ревью еще в разработке ')
  const data = await request.json()  
  const res = await reviewsStartAll(data)
  return Response.json(res)
}

// TODO
async function reviewsStartAll(data: ReviewPOST){
  // найти всех пользователей
  // найти их активные цели
  // создать каждому пользователю ревью с его активной целями
}