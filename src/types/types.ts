// types from Prisma ******************************************************************************************************
import { User } from '@heroui/user'
import {  User, Review, Task, Feedback, typeAuthor } from '@prisma/client'
export type {  User, Review, Task, Feedback, typeAuthor } from '@prisma/client'

// User  ******************************************************************************************************

export type UserGET = User & {
  lead?: User
  subordinates?: User[]
}

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

// export type TaskFeedbacks = Task & {
//   feedbacks:  FeedbackGET
//   executor:   User
// }

export type ReviewGET = Review & {
  author?:    User
  employee?:  User   
  tasks?:     TaskGET[]
  feedbacks:  FeedbackGET[]
}

// Task  ******************************************************************************************************
export type TaskPOST = {
  // id: number;
  // createdAt: Date;
  // updatedAt: Date;
  executorId: string | null;
  isTarget: boolean | null;
  title: string;
  description?: string | null;
  dateStart?: Date | null;
  dateEnd?: Date | null;
  link?: string | null;
  coefficient?: number;
  project?: string | null;
  authorId?: string | null;
  targetId?: number | null;
  // progress: number;
  // reviewId: number | null;
}

export type TaskGET = Task & {
  executor?:    User
  feedbacks?:   FeedbackGET[]
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

export type FeedbackGET = Feedback & {
  author?: User | null
}
