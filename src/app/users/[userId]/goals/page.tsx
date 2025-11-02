'use client'

import GoalsTable from "@/components/GoalTable"
import { useQueryData } from "@/hooks/useQueryData"
import { APIUser, CRUD } from "@/lib/API"
import AlertError from "@/shared/ui/AlertError"
import LoadingAlert from "@/shared/ui/Loader/LoadingAlert"
import { Link } from "@heroui/link"
import { Task, User } from "@prisma/client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"



// TODO
export default function GoalsFromUser(){
  const params = useParams()
  const userId = params.userId as string
  const [ user, setUser ] = useState<User>()
  const { query, data: goals, isLoading, errorMessage } = useQueryData() 
  useEffect(()=>{
    APIUser.get(userId).then(setUser)
    const APIGoalFromUser = new CRUD(`/v0/user/${userId}/goal`)
    query(
      APIGoalFromUser.getList()
    )
  }, [])

  return <>
    {errorMessage && <AlertError>{errorMessage}</AlertError>}
    {isLoading && <LoadingAlert />}
    
    <p className="mb-5" >
      Список целей пользователя: 
      <Link href={`/users/${userId}`} className="mx-2">
        {user?.name || user?.email}
      </Link>
    </p>
    {/* {goals?.map((goal: Task) => <p>{JSON.stringify(goal)}</p>) } */}
    {goals && <GoalsTable goals={goals} />}
  </>
}


