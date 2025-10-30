'use client'

import ReviewView from '@/components/Review/Review'
import { useQueryData } from '@/hooks/useQueryData'
import { APIReview } from '@/lib/API'
import AlertError from '@/shared/ui/AlertError'
import ButtonLink from "@/shared/ui/ButtonLink"
import LoadingAlert from '@/shared/ui/Loader/LoadingAlert'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'


export default function Review(){
  const params = useParams()
  const reviewId = params.reviewId
  const {query, data: review, isLoading, errorMessage, setErrorMessage} = useQueryData()
  useEffect(()=>{
    reviewId && query(APIReview.get(reviewId))
  },[])

  return <>
    {errorMessage && <AlertError> Не удалось получить данные </AlertError>}
    {isLoading && <LoadingAlert />}

    {review && <ReviewView review={review} /> }

    <div className=" mt-5 *:mr-2 ">
      {/* <ButtonLink href={`/reviews/${reviewId}/settings`}>
        Настройки    
      </ButtonLink> */}
      <ButtonLink href={`/reviews/${reviewId}/edit`}>
        Редактировать
      </ButtonLink>
      <ButtonLink href={`/reviews/${reviewId}/result`}>
        Результат    
      </ButtonLink>
    </div>
  </>
}
