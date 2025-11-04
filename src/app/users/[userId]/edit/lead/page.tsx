"use client";

import { useQueryData } from "@/hooks/useQueryData";
import { APIUser, APIUserFull } from "@/lib/API";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete'
import { CRUD } from '@/lib/API'
import { Review, User, UserGET } from '@/types'
import AlertError from "@/shared/ui/AlertError";
import LoadingAlert from "@/shared/ui/Loader/LoadingAlert";
import { Button } from "@heroui/button";



export default function AddLead(){
  const router = useRouter()
  const [ leadId, setLeadId ]= useState<string | null>()
  const session = useSession()
  const userId = session.data?.user?.id
  const { query, data: user, isLoading, errorMessage} = useQueryData()
  useEffect(()=>{
    userId && query(APIUserFull.get(userId))
  },[])

  function save(){
    (userId && user ) 
    && 
    APIUser.edit(userId, {leadId })
      .then(res => {
        router.push('/cabinet')
      })
  }

  return <>
    <p className='mb-5'>Установите руководителя</p>
    {errorMessage && <AlertError/>}
    {isLoading && <LoadingAlert />}  
    {(userId && user) && 
      <>
        <InputUser   
          user={user}
          userId={userId}
          defaultValue={user.leadId} 
          onInput={setLeadId}
        />
        <br />
        <Button onPress={save}> Установить </Button>
      </>
    }
  </>
} 


function InputUser({
  user,
  userId, 
  defaultValue, 
  onInput
}: {
  user: UserGET
  userId: string, 
  defaultValue?: number | null, 
  onInput: (id: string | null)=>void
}){
  const { query, data: list, isLoading } = useQueryData()
  useEffect(()=>{
    query(
      APIUser.getList()
      .then(users => users.filter(
        (u: User) => ( u.id !== userId )
      ))
    )
  },[])

  return <>
    <Autocomplete  className="w-[400px] mb-2"
      isLoading={isLoading}
      name='leadId'
      label="Руководитель"
      defaultSelectedKey={defaultValue ? String(defaultValue) : undefined }
      // onSelectionChange={(v)=> {console.log(v)}}
      onSelectionChange={(key) => {onInput(key as string | null)}}
    >
      {list?.map((user: User) => 
        <AutocompleteItem key={user.id} >{user.name || user.email}</AutocompleteItem>
      )}
    </Autocomplete>
  </>
}
