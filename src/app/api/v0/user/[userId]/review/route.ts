import {prisma} from '@/lib/prisma/client'

type Context = { params: { userId: string } }

export async function GET(request: Request, context: Context){
  const userId = (await context.params).userId
  if (!userId) return Response.json({ error: 'Not Found' }, { status: 404 })

  const goals = await prisma.review.findMany({
    where: {
      employeeId: userId,
    },
    include: { tasks: { include: {feedbacks: true}}}
  })
  if ( ! goals ) return Response.json({ error: 'Not Found' }, { status: 404 })
  
  return Response.json(goals)
}
