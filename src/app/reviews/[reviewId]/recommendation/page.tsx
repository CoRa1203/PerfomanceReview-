'use client'

import ListFeedback from "@/components/Feedback/ListFeedback";
import CreateRecommendation from "@/components/Review/CreateRecommendation";
import ReviewInfo from "@/components/Review/ReviewInfo";
import { useQueryData } from '@/hooks/useQueryData'
import { APIReview, APIReviewRes } from '@/lib/API'
import AlertError from '@/shared/ui/AlertError'
import LoadingAlert from '@/shared/ui/Loader/LoadingAlert'
import { ReviewGET } from "@/types";
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'


export default function Review(){
  const params = useParams()
  const reviewId = params.reviewId as string | undefined
  const {query, data: review, isLoading, errorMessage, setErrorMessage} = useQueryData()
  const [reviewRes, setReviewRes ] = useState<ReviewGET>()
  useEffect(()=>{
    reviewId && APIReviewRes.get(reviewId).then(setReviewRes)
    reviewId && query(APIReview.get(reviewId))
  },[])

  return <>
    {errorMessage && <AlertError> Не удалось получить данные </AlertError>}
    {isLoading && <LoadingAlert />}
    {reviewRes && <ReviewInfo review={reviewRes} /> }
    {(reviewRes?.tasks && reviewRes?.feedbacks) && < ListFeedback tasks={reviewRes.tasks} feedbacks={reviewRes.feedbacks} viewResponse /> }
    {review && <CreateRecommendation review={review} /> }
  </>
}
