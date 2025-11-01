// TODO не сходиться...
/*
перф        6  / 11  = 5 
потенциал   12 / 16  = 4 
*/

'use client'

import { useState } from 'react'
import { 
  Select, SelectItem,
  Checkbox,
  Input,
  Button,
  // NumberInput,
} from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useQueryData } from '@/hooks/useQueryData'
import { APIFeedback } from '@/lib/API'
import AlertError from '@/shared/ui/AlertError'
import LoadingAlert from '@/shared/ui/Loader/LoadingAlert'

const [
  Label,
  CheckPerf,
  CheckPotencial,
  CheckInvertPerf,
  CheckInvertPotencial,
  CheckNull,
] = [
  'label',
  'checkPerfomance',
  'checkPotencial',
  'checkInvertPerfomance',
  'checkInvertPotencial',
  'checkNull',
]

const list = [
  {type: Label, title: 'Какие профессиональные качества проявил сотрудник за последний период работы'},
  {type: CheckPerf, title: 'Ответственность'},
  {type: CheckPerf, title: 'Ориентация на результат'},
  {type: CheckPerf, title: 'Проактивность (исследовал решение глубже, чем ожидалось)'},
  {type: CheckPerf, title: 'Открытое мышление (нестандартное мышление) - тестировал новые подходы'},
  {type: CheckPerf, title: 'Командный игрок (объединял команду, вел за собой)'},

  {type: Label, title: 'Какие личные качества проявлял сотрудник за последний период работы'},
  {type: CheckPotencial, title: 'Не боялся брать на себя больше ответственности в задаче'},
  {type: CheckPotencial, title: 'Выстраивал открытую прозрачную и точную коммуникацию с коллегами'},
  {type: CheckPotencial, title: 'Оперативно делился информацией о задаче с коллегами'},
  {type: CheckPotencial, title: 'Выстраивал работу по задаче'},

  {type: Label, title: 'Приходилось ли тебе за последние полгода проводить 1:1, на котором нужно было мотивировать сотрудника дополнительно по уже реализуемой задаче'},
  // TODO ! radio
  {type: CheckNull, title: 'Да'},
  {type: CheckPotencial, title: 'Нет'},
  {type: Label, title: 'Знаешь ли ты о случаях, когда сотрудник не делился дискоммуникацией с другими коллегами и это негативно сказывалось на результатах'},
  // TODO ! radio
  {type: CheckNull, title: 'Да'},
  {type: CheckPerf, title: 'Нет'},
  
  // TODO
  {type: Label, title: 'Знаешь ли ты о желании сотрудника развиваться дальше (в каком треке, какие роли интересны)'},
  {type: CheckPotencial, title: 'Да'},
  {type: CheckNull, title: 'Нет'},
  // TODO !
  // 1) Да, хочет развиваться и проактивно себя ведет
  // 2) Да, хочет развиваться, но сам не может идти по плану развития, нужна помощь менеджера/HR
  // 3) Не уверен, что есть желание развиваться
  // 4) Не хочет

  // TODO ! radio
  {type: Label, title: 'Считаешь ли ты сотрудника своим преемником?'},
  {type: CheckPotencial, title: 'Да'},
  {type: CheckNull, title: 'Нет'},
]



export default function FeebackReviewForm({ reviewId, authorId }: {reviewId: number, authorId: string}){
  const { query, errorMessage, isLoading, data, setData } = useQueryData()
  const router = useRouter()

  function handleForm(data: object){
    const newFeedback = {
      ...data,
      response: {}, // TODO
      authorId,
      reviewId,
    }
    console.log(newFeedback)
    query(
      APIFeedback.create(newFeedback)
      .then(feedback => {
        router.push(`/reviews/${reviewId}`)
      })
    )
  }

  return <>
    {errorMessage && <AlertError/>}
    {isLoading && <LoadingAlert />}  
    <FeebackReviewFormPerfomancePotential 
      onSubmit={handleForm} 
      isDisabledButton={isLoading} 
      // buttonName='' 
    />
  </>
} 



function FeebackReviewFormPerfomancePotential({
  onSubmit, 
  isDisabledButton,
  buttonName,
}:{
  onSubmit: (data: object) => void
  isDisabledButton?: boolean, 
  buttonName?: string
}){

  const [ perfomance, setPerfomance ] = useState(0)
  const [ potential, setPotential ] = useState(0)

  function onAddPerfomance(points?: number){setPerfomance(old => old + (points || 1) )}
  function onReducePerfomance(){setPerfomance(old => old - 1 )}

  function onAddPotential(points?: number){setPotential(old => old + (points || 1) )}
  function onReducePotential(){setPotential(old => old - 1 )}


  // ***************************************************************************************
  const [ pointYers, setPointYesrs ] = useState(0)  // через сколько лет станет приемником
  const [ dismissal, setDismissal ] = useState(0)   // риск увольнения

  // ***************************************************************************************
  const sumPerfomance = perfomance
  const sumPotential =  potential + pointYers + dismissal

  function save(){
    const data = {
      perfomance: sumPerfomance,
      potential: sumPotential,
    }
    console.log(data)
    onSubmit(data)
  }

  // Templste ***************************************************************************************
  return <>
    {/* <p>результативность - {sumPerfomance} / 6</p>
    <p>потенциал - {sumPotential} / 12</p> */}

    {list.map((item, index) => (
      <div key={index}>
        {(()=>{switch(item.type){
          case CheckPerf:
            return <>
              <Checkbox onValueChange={(v) => { v ? onAddPerfomance() : onReducePerfomance() }} >
                {item.title}
              </Checkbox> 
              <br/>
            </>
          case CheckInvertPerf:
            return <>
              <Checkbox onValueChange={(v) => { (!v) ? onAddPerfomance() : onReducePerfomance() }} >
                {item.title}
              </Checkbox> 
              <br/>
            </>
          case CheckPotencial: 
            return <>
              <Checkbox onValueChange={(v) => { v ? onAddPotential() : onReducePotential() }} >
                {item.title}
              </Checkbox> 
              <br/>
            </>
          case CheckInvertPotencial:
            return <>
              <Checkbox onValueChange={(v) => { (!v) ? onAddPotential() : onReducePotential() }} >
                {item.title}
              </Checkbox> 
              <br/>
            </>
          case CheckNull: 
            return <>
              <Checkbox >
                {item.title}
              </Checkbox> 
              <br/>
            </>
          case Label:
            return <><br/><p>{item.title}</p></>
          default: 
            return <p>Ошибка: вопрос не определен</p>
        }})()
      }
      </div>)
    )}

    <br/><p>Если да, когда он будет готов</p>
    {/* <p>{pointYers}</p> */}
    <Select
      onSelectionChange={(v)=>{
        // const ratingScale = {
        //   'через 1-2 года': 2,
        //   'через 3 года': 1,
        //   'через 3 и более лет': 0,
        // }
        // const points = ratingScale[v.anchorKey]
        const points = v.anchorKey && +v.anchorKey
        if (Number.isFinite(points)) {
          // onAddPotential(points as number)
          setPointYesrs(points as number)
        }
      }}
    >
      <SelectItem key={2} >через 1-2 года</SelectItem>
      <SelectItem key={1} >через 3 года</SelectItem>
      <SelectItem key={0} >через 3 и более лет</SelectItem>
    </Select>

    <br/><p>Как ты оцениваешь степень риска ухода сотрудника</p>
    {/* <p>{dismissal}</p> */}
    <Input type='number' min={0} max={10}
      onValueChange={(v)=>{
        if (+v <= 2) {
          setDismissal(3)
        } else if (+v <= 5) {
          setDismissal(2)
        } else if (+v <= 7) {
          setDismissal(1)
        } else {
          setDismissal(0)
        }
      }}
      description='где 0 - нет риска, 10 - высокая степень риска ухода даже в этом году'
    />

    <Button color='primary'
      onPress={save} 
      isDisabled={isDisabledButton}
    > 
      { buttonName || 'Сохранить' } 
    </Button>
  </>
}
