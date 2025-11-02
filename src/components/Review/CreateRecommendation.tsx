'use client'

import { Review, ReviewPOST, Task } from "@/types"
import Form, {Field} from '@/components/Form'
import { useRouter } from "next/navigation"
import { APIFeedback, APIReview, CRUD } from "@/lib/API"
import { useQueryData } from "@/hooks/useQueryData"
import AlertError from "@/shared/ui/AlertError"
import LoadingAlert from "@/shared/ui/Loader/LoadingAlert"
import { useEffect } from "react"


const fields: Field[] = [
  {
    type: 'textarea',
    name: 'recommendation',
    label: 'Рекомендации',
  },
]


export default function CreateRecommendation({review}: {review?: Review}){
  const router = useRouter()
  const { query, isLoading, errorMessage } = useQueryData()
  useEffect(()=>{
    const userId = review?.employeeId
    const APIUserGoal = new CRUD(`/v0/user/${userId}/goal`)
    query(APIUserGoal.getList() 
      //.then((goals: Task[]) => goals.filter(g => ! g.isActiv ))
    )
  }, [])

  function handleSubmit(dateForm: any){
    const date = {  
      ...dateForm,
      dateStart: new Date(dateForm.dateStart),
      dateEnd: new Date(dateForm.dateEnd),
      dateRes: new Date(dateForm.dateRes),
    }
    // console.log(date)
    
    if (review?.id) {
      APIReview.update(review.id, date).then(res => {
        router.push(`/reviews/${res.id}`)
        // router.back()
      })

    } else {
      APIReview.create(date).then(res => {
        router.push(`/reviews/${res.id}`)
        // router.back()
      })
    }
  }

  return <>
    {errorMessage && <AlertError/>}
    {isLoading && <LoadingAlert />}
    <div className='flex flex-col w-80 mt-20 gap-4'>
    <h1 className="text-2xl">Заполнить ревью</h1>
    <Form fields={fields} defaultValues={review} onSubmit={handleSubmit} ButtonName={'Сохранить'} />
    </div>
  </>

}


