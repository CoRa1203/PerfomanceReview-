import {prisma} from '@/lib/prisma/client'
import { Task } from '@prisma/client'

type Context = { params: { userId: string } }

export async function GET(request: Request, context: Context){
  const userId = (await context.params).userId
  if (!userId) return Response.json({ error: 'Not Found' }, { status: 404 })

  const goals = await prisma.task.findMany({ 
    where: {
      executorId: userId,
      isTarget: true,
    },
    include: {tasks: true}
  })
  if ( ! goals ) return Response.json({ error: 'Not Found' }, { status: 404 })
  
  return Response.json(goals)
}
