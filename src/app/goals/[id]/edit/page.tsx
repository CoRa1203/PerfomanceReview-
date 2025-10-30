'use client'

import { useEffect } from "react";
import { Task } from "@prisma/client";
import { APIGoal, APITask } from "@/lib/API";
import { useParams } from "next/navigation";
import { useQueryData } from "@/hooks/useQueryData";
import AlertError from "@/shared/ui/AlertError";
import FormGoal from "@/components/Forms/FormGoal";
import LoadingAlert from "@/shared/ui/Loader/LoadingAlert";


export default function GoalsEdit() {
  // const goalId = useParams().goalId as string | undefined
  const goalId = useParams().id as string | undefined
  const {query, data, isLoading, errorMessage, setErrorMessage} = useQueryData()
  useEffect(()=>{
    goalId && query(APITask.get(goalId))
  },[])

  return <>
    {errorMessage && <AlertError/>}
    {isLoading && <LoadingAlert />}  
    {data && <FormGoal goalData={data} />}
  </>
}
