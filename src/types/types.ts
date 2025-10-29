// types from Prisma ******************************************************************************************************
import {  User, Review, Task, Feedback, typeAuthor } from '@prisma/client'
export type {  User, Review, Task, Feedback, typeAuthor } from '@prisma/client'

// User  ******************************************************************************************************

// Review  ******************************************************************************************************

export type ReviewPOST = {
  // id: number;
  // createdAt: Date;
  // updatedAt: Date;
  // authorId: string | null;
  dateStart?: Date | null;
  dateEnd?: Date | null;
  dateRes?: Date | null;

  result?: number | null;
  perfomance?: number | null;
  potential?: number | null;
  
  recommendation?: string | null;
  
  employeeId: string | null;
}

// Task  ******************************************************************************************************
export type TaskGET = Task & {
  executor: User
}


// Feedback  ******************************************************************************************************
export type FeedbackPOST = {
  // id: number;
  // createdAt: Date;
  // updatedAt: Date;
  response:     object;
  result:       number;
  taskId:      number | null;
  authorId:    string | null;
  typeAuthor:  typeAuthor | null;
  // typeAuthor: $Enums.typeAuthor | null;
  // response: JsonValue;
}