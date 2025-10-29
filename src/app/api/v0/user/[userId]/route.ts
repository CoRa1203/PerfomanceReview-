import {prisma} from '@/lib/prisma/client'
import {models} from '@/lib/prisma/models'
import { Feedback, Review, Task } from '@prisma/client'

type Context = { params: { userId: string } }

export async function GET(request: Request, context: Context){
  const id = (await context.params).userId
  const res = await prisma.user.findFirst({where: {id}})
  if (res) {
    return Response.json(res)
  } else { 
    return Response.json(
      { error: 'Not Found' },
      { status: 404 }
    );
  }
}


export async function PUT(request: Request, context: Context){
  const id = (await context.params).userId
  const data = await request.json()  

  const res = await prisma.user.update({where: {id}, data}) 
  return Response.json(res)
}


export async function PATCH(request: Request, context: Context){
  const id = (await context.params).userId
  const data = await request.json()  
  const res = await prisma.user.update({where: {id}, data}) 
  return Response.json(res)
}


export async function DELETE(request: Request, context: Context){
  const id = (await context.params).userId
  const res = await prisma.user.delete({where: {id}}) 
  return Response.json(res)
}
