'use client'

import { useQueryData } from '@/hooks/useQueryData'
import AlertError from '@/shared/ui/AlertError'
import LoadingAlert from '@/shared/ui/Loader/LoadingAlert'
import { APIReview } from '@/lib/API'
import { useEffect } from 'react'
import Reviews from '@/components/Review/Rviews'
import Link from 'next/link'
import { Button } from '@heroui/button'
import { Add } from '@/components/icons'


export default function PageRviews(){
  const {query, data: reviews, isLoading, errorMessage, setErrorMessage} = useQueryData()
  useEffect(()=>{
    query(APIReview.getList())
  },[])

  return <>
    {errorMessage && <AlertError> Не удалось загрузить данные </AlertError>}
    {isLoading && <LoadingAlert />}
    <Link href="/reviews/add" >
      <Button isIconOnly color="primary" className="mb-5">
        <Add />
      </Button>
    </Link>
    {reviews && <Reviews reviews={reviews} />} 
  </>
}