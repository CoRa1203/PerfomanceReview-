'use client'

import { useQueryData } from '@/hooks/useQueryData'
import { APIUser, CRUD } from '@/lib/API'
import AlertError from '@/shared/ui/AlertError'
import LoadingAlert from '@/shared/ui/Loader/LoadingAlert'
// import { APIReview } from '@/lib/API'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Reviews from '@/components/Review/Rviews'
import { Link } from '@heroui/link'
import { User } from '@/types'



export default function PageRviews(){
  // const session = useSession()
  // const userId = session.data?.user?.id
  // console.log(session)
  const params = useParams()
  const userId = params.userId as string
  const {query, data: reviews, isLoading, errorMessage, setErrorMessage} = useQueryData()
  const [ user, setUser ] = useState<User>()
  useEffect(()=>{
    APIUser.get(userId).then(setUser)
    const APIReview = new CRUD(`/v0/user/${userId}/review`)
    userId && query(APIReview.getList())
  },[])

  return <>
    <p className="mb-5" >
      Список ревью пользователя: 
      <Link href={`/users/${userId}`} className="mx-2">
        {user?.name || user?.email}
      </Link>
    </p>
    {errorMessage && <AlertError> Не удалось загрузить данные </AlertError>}
    {isLoading && <LoadingAlert />}
    {reviews && <Reviews reviews={reviews} />} 
  </>
}