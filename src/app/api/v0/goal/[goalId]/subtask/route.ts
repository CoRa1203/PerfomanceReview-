import {prisma} from '@/lib/prisma/client'
import { Task } from '@prisma/client'

type Context = { params: { goalId: string } }

export async function GET(request: Request, context: Context){
  const goalId = parseInt((await context.params).goalId)
  if ( isNaN(goalId)) return Response.json({ error: 'Not Found' }, { status: 404 })

  const goal = await prisma.task.findFirst({ 
    where: {id: goalId},
    select: {tasks: true}
    // select: {tasks: {
      // include: {tasks: {include: {tasks: true}}}
    // }}
  })
  if ( ! goal ) return Response.json({ error: 'Not Found' }, { status: 404 })
  
  const res = goal.tasks 
  return Response.json(res)
}


export async function POST(request: Request, context: Context){
  const goalId = parseInt((await context.params).goalId)
  if ( isNaN(goalId)) return Response.json({ error: 'Not Found' }, { status: 404 })
    
  const goal = await prisma.task.findFirst({ where: {id: goalId} })
  if ( ! goal ) return Response.json({ error: 'Not Found' }, { status: 404 })
      
  const data = await request.json()
  const res = await prisma.task.create({
    data: {
      ...data,
      targetId: goal.id
    }
  })

  // const goal = await prisma.task.update({
  //   where: {id: goalId},
  //   data: {
  //     // tasks: {create: [data]}
  //     tasks: {connect: [res]}
  //   }
  // })

  return Response.json(res)
}

