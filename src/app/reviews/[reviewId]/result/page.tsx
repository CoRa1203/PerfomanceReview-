'use client'

import ReviewResult from '@/components/Review/Result/ReviewResult'
import { useQueryData } from '@/hooks/useQueryData'
import { APIReviewRes } from '@/lib/API'
import AlertError from '@/shared/ui/AlertError'
import LoadingAlert from '@/shared/ui/Loader/LoadingAlert'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'


export default function Review(){
  const params = useParams()
  const reviewId = params.reviewId  as string | undefined
  const {query, data: review, isLoading, errorMessage, setErrorMessage} = useQueryData()
  useEffect(()=>{
    reviewId && query(APIReviewRes.get(reviewId))
  },[])

  return <>
    {errorMessage && <AlertError> Не удалось получить данные </AlertError>}
    {isLoading && <LoadingAlert />}

    {review && <ReviewResult review={review} /> }

  </>
}
