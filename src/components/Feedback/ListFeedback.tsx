'use client'

import { ReviewGET, Review, TaskGET, FeedbackGET } from "@/types";

const [ SELF, LEAD, COLLEAGUE ] = ['self', 'lead', 'colleague']

function getAuthor(f: FeedbackGET): string {
  const user = f.author.name || f.author.email
  switch(f.typeAuthor){
    case SELF: 
      return `Самооценка`
    case LEAD: 
      return `Отзыв руководителя: ${user}`
    case COLLEAGUE: 
      return `Отзыв коллеги: ${user}`
    default:
      return `Автор отзыва: ${user}`
  }
}

export default function ListFeedback({
  tasks,
  feedbacks,
  viewAuthor=true,
  viewResponse,
}:{
  tasks: TaskGET[],
  feedbacks: FeedbackGET[],
  viewAuthor?: boolean,
  viewResponse?: boolean,
}){

  return <>
    <p>Отзывы по целям</p>
    {tasks.map(t => <div key={t.id}>
      <p>Цель: {t.title}</p>
      {t.feedbacks?.map( f => <div key={f.id}>
        { viewAuthor ? <p className="ml-5" >{getAuthor(f)}</p> : <></>}
        {/* @ts-ignore */}
        { viewResponse ? <ResponseView responses={f.response} /> : <></>}
      </div>)}
    </div>) 
    }
    <br />
    <p>Отзывы "Результативнсть и перспективность"</p>
     {feedbacks?.slice(-1).map( f => <div key={f.id}>
        <p className="ml-5" >Отзыв руководителя: {f.author.name || f.author.email}</p>
      </div>
    )}
  </>
}

type Response = {
  question: string,
  answer: string,
}

// TODO  изменить структуру
// function ResponseView({responses}:{responses: Response}){
function ResponseView({responses}:{responses: object | null}){

  if (!responses) return <></>

  responses = Object.entries(responses).map(([question, answer]) => ({ question, answer })) as Response[]
  console.log(responses)

  return <div className="ml-10">
    {/* @ts-ignore */}
    {responses?.map((response: Response, index: number) => (
      <div key={index}>
        {/* <p>{response.question}</p> */}
        {/* <p>{response.answer}</p> */}
        { Number.isFinite(response.answer) ? <></> : <p>{response.answer}</p>}
      </div>
    ))}
  </div>
}
