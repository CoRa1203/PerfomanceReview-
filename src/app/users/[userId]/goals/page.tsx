'use client'

import { useQueryData } from "@/hooks/useQueryData"
import { CRUD } from "@/lib/API"
import AlertError from "@/shared/ui/AlertError"
import LoadingAlert from "@/shared/ui/Loader/LoadingAlert"
import { Task } from "@prisma/client"
import { useParams } from "next/navigation"
import { useEffect } from "react"


// TODO
export default function GoalsFromUser(){
  const params = useParams()
  const userId = params.userId
  const { query, data: goals, isLoading, errorMessage } = useQueryData() 
  useEffect(()=>{
    const APIGoalFromUser = new CRUD(`/v0/user/${userId}/goal`)
    query(
      APIGoalFromUser.getList()
    )
  }, [])

  return <>
    {errorMessage && <AlertError>{errorMessage}</AlertError>}
    {isLoading && <LoadingAlert />}
    
    <p>Список целей пользователя</p>
    {goals?.map((goal: Task) => <p>{JSON.stringify(goal)}</p>) }
  </>
}


