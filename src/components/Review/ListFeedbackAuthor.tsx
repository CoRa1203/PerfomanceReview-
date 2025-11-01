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
    {tasks.map(t => <div key={t.id}>
      <p>Цель: {t.title}</p>
      {t.feedbacks?.map( f => <div key={f.id}>
        <p className="ml-5" >Автор отзыва: {f.author.name || f.author.email}</p>
        {/* TODO вывести тип отзыва */}
      </div>)}
    </div>) 
    }
    <br />
    <p>Отзывы "Результативнсть и перспективность"</p>
     {feedbacks?.map( f => <div key={f.id}>
        <p className="ml-5" >Автор отзыва: {f.author.name || f.author.email}</p>
      </div>
    )}
  </>
}
