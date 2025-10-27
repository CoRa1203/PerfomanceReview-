// types from Prisma ******************************************************************************************************
import {  User, Review, Task, Feedback, typeAuthor } from '@prisma/client'
export type {  User, Review, Task, Feedback, typeAuthor } from '@prisma/client'

// User  ******************************************************************************************************

// Review  ******************************************************************************************************

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