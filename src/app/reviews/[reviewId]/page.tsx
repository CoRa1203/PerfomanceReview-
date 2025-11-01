'use client'

import ButtonCopyLink from '@/components/ButtonCopyLink'
import ReviewPage from '@/components/Review/ReviewPage'
import { useQueryData } from '@/hooks/useQueryData'
import { APIReviewRes } from '@/lib/API'
import AlertError from '@/shared/ui/AlertError'
import ButtonLink from "@/shared/ui/ButtonLink"
import LoadingAlert from '@/shared/ui/Loader/LoadingAlert'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'


export default function Review(){
  const params = useParams()
  const reviewId = params.reviewId as string | undefined
  const {query, data: review, isLoading, errorMessage, setErrorMessage} = useQueryData()
  useEffect(()=>{
    reviewId && query(APIReviewRes.get(reviewId))
  },[])

  return <>
    {errorMessage && <AlertError> Не удалось получить данные </AlertError>}
    {isLoading && <LoadingAlert />}

    {review && <ReviewPage review={review} /> }

    <div className=" mt-5 *:mr-2 ">
      {/* <ButtonLink href={`/reviews/${reviewId}/settings`}>
        Настройки    
      </ButtonLink> */}
      <ButtonLink  href={`/reviews/${reviewId}/edit`}>
        Редактировать
      </ButtonLink>
      <ButtonLink href={process.env.NEXT_PUBLIC_HOST + `/reviews/${reviewId}/feedback`} >
        Поставить оценку результативности и потенциала
      </ButtonLink>
      {/* <ButtonCopyLink text={process.env.NEXT_PUBLIC_HOST + `/reviews/${review.id}/feedback`}>
        Скопировать ссылку для фидбека
      </ButtonCopyLink> */}
      <ButtonLink href={`/reviews/${reviewId}/result`}>
        Результат    
      </ButtonLink>
    </div>
  </>
}
