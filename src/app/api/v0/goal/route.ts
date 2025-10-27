import {prisma} from '@/lib/prisma/client'
import { Task } from '@prisma/client'


export async function GET(request: Request){
  const res = await prisma.task.findMany({ 
    include: {tasks: true}
    // select: {tasks: {
      // include: {tasks: {include: {tasks: true}}}
    // }}
  })
  return Response.json(res)
}

export async function POST(request: Request){
  const data = await request.json()  
  const res = await prisma.task.create({ data })
  return Response.json(res)
}
