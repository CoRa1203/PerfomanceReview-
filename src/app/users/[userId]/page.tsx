'use client'

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { APIUser } from "@/lib/API"
import { useQueryData } from "@/hooks/useQueryData"
import LoadingAlert from "@/shared/ui/Loader/LoadingAlert"
import AlertError from "@/shared/ui/AlertError"
import UserProfile from '@/components/User/UserProfile'

export default function UserPage(){
  const params = useParams()
  const userId = params.userId as string | undefined
  const { query, data: user, isLoading, errorMessage } = useQueryData() 
  useEffect(()=>{
    userId && query( APIUser.get(userId) )
  }, [])

  return <>
    <p className="mb-5"> Профиль пользователя </p>
    {errorMessage && <AlertError>{errorMessage}</AlertError>}
    {isLoading && <LoadingAlert />}
    {user && <UserProfile user={user} />}
  </>
}
