import {prisma} from '@/lib/prisma/client'
import {models} from '@/lib/prisma/models'
import { Feedback, Review, Task } from '@prisma/client'

type Context = { params: { reviewId: string } }

export async function GET(request: Request, context: Context){
  const id = parseInt((await context.params).reviewId)
  if (isNaN(id)) {
    return Response.json(
      { error: 'Not Found' },
      { status: 404 }
    );
  }

  const res = await prisma.review.findUnique({
    where: {id},
    include: {
      employee: true,
      tasks: { 
        include: {
          feedbacks: { 
            include: { 
              author: true 
            }
          }
        },
      },
    }
  })
  if (res) {
    return Response.json(res)
  } else { 
    return Response.json(
      { error: 'Not Found' },
      { status: 404 }
    );
  }
}


// export async function PUT(request: Request, context: Context){
//   const table = (await context.params).table
//   const id = parseInt((await context.params).id)
//   if (! models.includes(table) || isNaN(id)) {
//     return Response.json({ error: 'Not Found' }, { status: 404 })
//   }

//   const {id: itemId, ...data} = await request.json()  
//   // @ts-ignore
//   const res = await prisma[table].update({where: {id}, data}) 
//   return Response.json(res)
// }


// export async function PATCH(request: Request, context: Context){
//   const table = (await context.params).table
//   const id = parseInt((await context.params).id)
//   if (! models.includes(table) || isNaN(id)) {
//     return Response.json({ error: 'Not Found' }, { status: 404 })
//   } 

//   const data = await request.json()  
//   // @ts-ignore
//   const res = await prisma[table].update({where: {id}, data}) 
//   return Response.json(res)
// }


// export async function DELETE(request: Request, context: Context){
//   const table = (await context.params).table
//   const id = parseInt((await context.params).id)
//   if (! models.includes(table) || isNaN(id)) {
//     return Response.json({ error: 'Not Found' }, { status: 404 })
//   } 

//   // const data = await request.json()  
//   // @ts-ignore
//   const res = await prisma[table].delete({where: {id}}) 
//   return Response.json(res)
// }
