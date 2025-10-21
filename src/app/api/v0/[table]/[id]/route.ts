import {prisma} from '@/lib/prisma/client'
import {models} from '@/lib/prisma/models'
import { Feedback, Review, Task } from '@prisma/client'

type Context = { params: { table: string, id: string } }

export async function GET(request: Request, context: Context){
  const id = parseInt((await context.params).id)
  const table = (await context.params).table
  if (! models.includes(table) || isNaN(id)) {
    return Response.json(
      { error: 'Not Found' },
      { status: 404 }
    );
  }

  // @ts-ignore
  const res = await prisma[table].findFirst({where: {id}})
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
  const table = (await context.params).table
  const id = parseInt((await context.params).id)
  if (! models.includes(table) || isNaN(id)) {
    return Response.json({ error: 'Not Found' }, { status: 404 })
  }

  const data = await request.json()  
  // @ts-ignore
  const res = await prisma[table].update({where: {id}, data}) 
  return Response.json(res)
}


export async function PATCH(request: Request, context: Context){
  const table = (await context.params).table
  const id = parseInt((await context.params).id)
  if (! models.includes(table) || isNaN(id)) {
    return Response.json({ error: 'Not Found' }, { status: 404 })
  } 

  const data = await request.json()  
  // @ts-ignore
  const res = await prisma[table].update({where: {id}, data}) 
  return Response.json(res)
}
