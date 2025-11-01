'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Review } from '@prisma/client'

import { APIFeedback, APIReview } from '@/lib/API'
import { useQueryData } from '@/hooks/useQueryData'

import AlertError from '@/shared/ui/AlertError'
import LoadingAlert from '@/shared/ui/Loader/LoadingAlert'
import ReviewInfo from '@/components/Review/ReviewInfo'
import FeebackReviewForm from '@/components/Feedback/FeebackReviewForm'



export default function FeebackReview(){
  const session = useSession()
  const userId = session.data?.user?.id
  // const [review, setReview] = useState<Review>()
  const params = useParams<{ reviewId: string }>()
  const reviewId = parseInt(params.reviewId)
  const { query, errorMessage, isLoading, data: review, setData } = useQueryData()
  useEffect(()=>{
    query(
      APIReview.get(reviewId)
    )
  }, [])

  return <>
    {errorMessage && <AlertError/>}
    {isLoading && <LoadingAlert />}  
    {/* TODO ! доступно только руководителю  */}
    { review && <ReviewInfo review={review}/>}
    {( reviewId && userId ) &&  <FeebackReviewForm reviewId={reviewId} authorId={userId} /> }
  </>
}
