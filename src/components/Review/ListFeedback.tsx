'use client'

import { ReviewGET, Review, TaskGET, FeedbackGET } from "@/types";
import ListFeedbackAuthor from './ListFeedbackAuthor'

// TODO сделать позже
// компонент выводит отзывы 
export default function ListFeedback({
  tasks,
  feedbacks,
}:{
  tasks: TaskGET[],
  feedbacks: FeedbackGET[],
}){

  // пока использукется шаблон отзывов с авторами
  // TODO надо сделать собственный вывод который дополнительно выводит  ansvers или переход на страницу с отзывом

  return <ListFeedbackAuthor tasks={tasks} feedbacks={feedbacks} />
}
