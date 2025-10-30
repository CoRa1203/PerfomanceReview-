'use client'

import { useQueryData } from '@/hooks/useQueryData'
import { CRUD } from '@/lib/API'
import AlertError from '@/shared/ui/AlertError'
import LoadingAlert from '@/shared/ui/Loader/LoadingAlert'
// import { APIReview } from '@/lib/API'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import Reviews from '@/components/Review/Rviews'



export default function PageRviews(){
  // const session = useSession()
  // const userId = session.data?.user?.id
  // console.log(session)
  const params = useParams()
  const userId = params.userId
  const {query, data: reviews, isLoading, errorMessage, setErrorMessage} = useQueryData()
  useEffect(()=>{
    const APIReview = new CRUD(`/v0/user/${userId}/review`)
    userId && query(APIReview.getList())
  },[])

  return <>
    {errorMessage && <AlertError> Не удалось загрузить данные </AlertError>}
    {isLoading && <LoadingAlert />}
    {reviews && <Reviews reviews={reviews} />} 
  </>
}