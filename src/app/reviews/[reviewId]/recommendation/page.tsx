'use client'

import CreateRecommendation from "@/components/Review/CreateRecommendation";
import ReviewForm from "@/components/Review/ReviewForm";
import ReviewPage from "@/components/Review/ReviewPage";
import { useQueryData } from '@/hooks/useQueryData'
import { APIReview, APIReviewRes } from '@/lib/API'
import AlertError from '@/shared/ui/AlertError'
import ButtonLink from "@/shared/ui/ButtonLink"
import LoadingAlert from '@/shared/ui/Loader/LoadingAlert'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'


export default function Review(){
  const params = useParams()
  const reviewId = params.reviewId as string | undefined
  const {query, data: review, isLoading, errorMessage, setErrorMessage} = useQueryData()
  const [reviewRes, setReviewRes ] = useState()
  useEffect(()=>{
    reviewId && APIReviewRes.get(reviewId).then(setReviewRes)
    reviewId && query(APIReview.get(reviewId))
  },[])

  return <>
    {errorMessage && <AlertError> Не удалось получить данные </AlertError>}
    {isLoading && <LoadingAlert />}
    {reviewRes && <ReviewPage review={reviewRes} /> }
    {review && <CreateRecommendation review={review} /> }
  </>
}
