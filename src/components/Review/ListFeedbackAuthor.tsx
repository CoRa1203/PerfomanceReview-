'use client'

import { ReviewGET, Review, TaskGET, FeedbackGET } from "@/types";


export default function ListFeedbackAuthor({
  tasks,
  feedbacks,
}:{
  tasks: TaskGET[],
  feedbacks: FeedbackGET[],
}){

  return <>
    <p>Отзывы по целям</p>
    {tasks.map(t => <>
      <p>Цель: {t.title}</p>
      {t.feedbacks?.map( f => <>
        <p className="ml-5" >Автор отзыва: {f.author.name || f.author.email}</p>
        {/* TODO вывести тип отзыва */}
      </>)}
    </>) 
    }
    <br />
    <p>Отзывы "Результативнсть и перспективность"</p>
    {feedbacks.map( f => <>
      <p>{f.author.name || f.author.email}</p>
    </>)
    }
  </>
}
