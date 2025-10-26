import {prisma} from '@/lib/prisma/client'
import {models} from '@/lib/prisma/models'
import { Feedback, Review, Task } from '@prisma/client'

type Context = { params: { goalId: string } }


export async function GET(request: Request, context: Context){
  const id = parseInt((await context.params).goalId)
  if (isNaN(id)) {
    return Response.json({ error: 'Not Found' }, { status: 404 })
  } 
  const res = await prisma.task.findFirst({where: {id},
    include: { executor: true }
    // include: { executor: {include: lead} }
  })
  if (res) {
    return Response.json(res)
  } else { 
    return Response.json({ error: 'Not Found' }, { status: 404 })
  }
}


export async function PUT(request: Request, context: Context){
  const id = parseInt((await context.params).goalId)
  if (isNaN(id)) {
    return Response.json({ error: 'Not Found' }, { status: 404 })
  }

  const data = await request.json()  
  const res = await prisma.task.update({where: {id}, data}) 
  return Response.json(res)
}


export async function PATCH(request: Request, context: Context){
  const id = parseInt((await context.params).goalId)
  if (isNaN(id)) {
    return Response.json({ error: 'Not Found' }, { status: 404 })
  } 

  const data = await request.json()  
  const res = await prisma.task.update({where: {id}, data}) 
  return Response.json(res)
}
