import {prisma} from '@/lib/prisma/client'
import {models} from '@/lib/prisma/models'
import { Feedback, Review, Task } from '@prisma/client'

type Context = { params: { table: string } }

export async function GET(request: Request, context: Context){
  const table = (await context.params).table
  if (! models.includes(table)) {
    return Response.json(
      { error: 'Not Found' },
      { status: 404 }
    );
  }

  // @ts-ignore
  const res = await prisma[table].findMany()
  console.log(res)
  return Response.json(res)
}

export async function POST(request: Request, context: Context){
  const table = (await context.params).table
  if (! models.includes(table)) return Response.json({ error: 'Not Found' }, { status: 404 })
    
  const data = await request.json()  
  // @ts-ignore
  const res = await prisma[table].create({data}) 
  return Response.json(res)
}

