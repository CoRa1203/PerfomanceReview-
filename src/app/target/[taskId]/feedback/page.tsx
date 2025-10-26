// TODO 
// обязательные поля
// дизейблить поля на время isLoading

'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Task } from '@prisma/client'
import { TaskGET, FeedbackPOST } from '@/types'
import { APITask, APIFeedback, APIGoal } from '@/lib/API'
import { Alert, Button, Input, NumberInput, Textarea } from '@heroui/react'
import AlertError from '@/shared/ui/AlertError'
import LoadingAlert from '@/shared/ui/Loader/LoadingAlert'
import { useSession } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { useQueryData } from '@/hooks/useQueryData'
import {defineScore} from './lib'


type FeedbackData = Record<string, string | number>

const [ SELF, LEAD, COLLEAGUE ] = ['self', 'lead', 'colleague']


export default function FeedbackPage(){
  const router = useRouter()
  const [ task, setTask ] = useState<TaskGET | null >(null)
  const params = useParams<{taskId: string}>()
  const taskId = parseInt(params.taskId)
  useEffect(()=>{
    if (taskId) {
      APIGoal.get(taskId).then(task => setTask(task))
    }
  }, [taskId])
  const session = useSession()
  const user = session.data?.user
  const { query, data, errorMessage, isLoading } = useQueryData()
  const [ error, setError ] = useState<string | undefined>()
  useEffect(()=>{setError(errorMessage)}, [errorMessage])

  // const [typeAuthor, setTypeAuthor] = useState()
  const typeAuthor = useMemo(()=>{
    if (task && user ){
      if (user?.id === task?.executorId) {
        return SELF
      // TODO оцените подчененого
      } else if(user?.id === task?.executor.leadId) {
        return LEAD
      } else {
        return COLLEAGUE
      }
    } else return undefined
  }, [task, user])

 
  const save = (feedback: Record<string, string | number>)=>{
    if (taskId && user?.id && typeAuthor) {
      const feedbackData = {
        taskId,
        authorId: user.id,
        typeAuthor,
        result: defineScore(feedback),
        response: feedback
      }
      // console.log(feedbackData)
      query( 
        APIFeedback.create(feedbackData)
        // TODO выводить модалку что все сохранено и можно закрыть
        .then(res => { router.push('/') })
      )
    } else {
      console.error('Отсутствуют некоторые данные для сохранения')
      console.log(taskId, user?.id, typeAuthor)
    }
  }


  return <>
    {error && <AlertError>{error}</AlertError>}
    {isLoading && <LoadingAlert>Сохранение...</LoadingAlert>}
    {/* <p>{taskId}</p>
    <p>{JSON.stringify(task)}</p>
    <p>task?.executorId {task?.executorId}</p>
    <p>user {JSON.stringify(user)}</p>
    <p>{typeAuthor}</p> 
    <hr /> */}
    { task ? 
      <>
        {typeAuthor === COLLEAGUE &&
          <FeedbackColleague save={save} >
            <TaskView task={task} />
          </FeedbackColleague>
        }

        {typeAuthor === SELF &&
          <FeedbackSelf save={save} >
            <TaskView task={task} />
          </FeedbackSelf>
        }    

        {typeAuthor === LEAD &&
          <FeedbackLead save={save} >
            <TaskView task={task} />
          </FeedbackLead>
        }
      </>
      :
      <p> Загружается... </p>  
    }
  </>
}


function TaskView({task}: {task: TaskGET}){

  return <>
    <p> Исполнитель: 
      {task.executor?.name || task.executor?.email}
    </p>
    <p>Задача: {task.title}</p>
    <p>Описание: {task.description}</p>
  </>
}


import configColleague from './config/FeedbackColleague'

function FeedbackColleague({ save, children}: { save: (feedback: FeedbackData)=> void, children: React.ReactNode}){
  return <>
    <FeedbackForm   
      save={save}
      description={configColleague.description}
      answers={configColleague.answers} 
    >
      {children}
    </FeedbackForm>
  </>
}


import configSelf from './config/FeedbackSelf'

function FeedbackSelf({ save, children}: { save: (feedback: FeedbackData)=> void, children: React.ReactNode}){
  return <>
    <FeedbackForm   
      save={save}
      description={configSelf.description}
      answers={configSelf.answers} 
    >
      {children}
    </FeedbackForm>
  </>
}

import configLead from './config/FeedbackLead'

function FeedbackLead({ save, children}: { save: (feedback: FeedbackData)=> void, children: React.ReactNode}){
  return <>
    <FeedbackForm   
      save={save}
      {...configLead}
    >
      {children}
    </FeedbackForm>
  </>
}

// onChange={handleForm}    // ERROR баг библиотеки - не дает доступ к e.target.name
function FeedbackForm({
  children,
  save,
  description,
  answers,
}: {
  children: React.ReactNode
  save: (feedback: FeedbackData)=> void
  description: string,
  answers: Array<{
    name: string
    type?: string
    label?: string
    default?: string | number
    description?: string
  }>,
}){

  const [ dataForm, setDataForm ] = useState<Record<string, string | number>>({})
  useEffect(()=>{
    const defaultForm: { [key: string]: string | number } = {}
    answers.forEach(answer => {
      defaultForm[answer.name] = answer.default || (answer.type === '10' ? 0 : '')
    })
    setDataForm(defaultForm)
  }, [])

  const handleForm = (e) => {setDataForm(old => ({...old, [e.target.name]: e.target.value }))}
 
  const inputs = answers.map((answer, i) => {
    const { type, name, label } = answer
    switch(type){
      case '10': 
      return <NumberInput key={name} name={name} label={label}
        // onChange={handleForm}    // ERROR баг библиотеки - не дает доступ к e.target.name
        // onChange={(e) => {setDataForm(old => ({...old, 'answer2': e.target.value }))}}
        onValueChange = {(v) => {setDataForm(old => ({...old, [name] : v }))}} 
        minValue={0} maxValue={10} description={'Шкала от 0 до 10'}
      />
      case 'text': 
      default: 
        return <Textarea key={name} name={name} label={label} onChange={handleForm} /> 
        // return <p>Не удалось определить тип поля</p>
    }
  })

  function handleFeedback(): void {
    save(dataForm)
  }

  return <>
    <p>{description}</p>

    {/* Задача */}
    {children}
    
    {/* Форма */}
    <div  className='*:mt-2'>
      {inputs}
      <div className='*:mr-2' >
        <Button onPress={handleFeedback}> Отправить </Button>
        {/* <Button type="button" > Отложить  </Button> */}
      </div>
    </div>
  </>
}





