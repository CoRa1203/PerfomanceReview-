'use client'

import { Review, ReviewPOST } from "@/types"
import Form, {Field} from '@/components/Form'
import { useRouter } from "next/navigation"
import { APIFeedback, APIReview } from "@/lib/API"
import { useQueryData } from "@/hooks/useQueryData"
import AlertError from "@/shared/ui/AlertError"
import LoadingAlert from "@/shared/ui/Loader/LoadingAlert"


const fields: Field[] = [
  {
    type: 'date',
    name: 'dateStart',
    label: 'Начадо оцениваемого периода',
  },
  {
    type: 'date',
    name: 'dateEnd',
    label: 'Конец оцениваемого периода',
  },  
  {
    type: 'date',
    name: 'dateRes',
    label: 'Дата подведения результатов',
  },
  {
    type: 'text',
    name: 'recommendation',
    label: 'Рекомендации',
  },
]



export default function ReviewForm({review}: {review?: Review}){
  const router = useRouter()
  const { query, isLoading, errorMessage } = useQueryData()

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
      })

    } else {
      APIReview.create(date).then(res => {
        router.push(`/reviews/${res.id}`)
      })
    }
  }

  return <>
    {errorMessage && <AlertError/>}
    {isLoading && <LoadingAlert />}
    <Form fields={fields} defaultValues={review} onSubmit={handleSubmit} ButtonName={'Сохранить'} />
  </>

}


