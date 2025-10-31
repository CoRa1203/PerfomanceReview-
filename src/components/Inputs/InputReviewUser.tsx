
import { useEffect } from 'react'
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete'
import { useQueryData } from '@/hooks/useQueryData'
import { CRUD } from '@/lib/API'
import { Review } from '@/types'


export default function InputReviewUser({
  userId, 
  defaultValue, 
  onInput
}: {
  userId: string, 
  defaultValue?: number | null, 
  onInput: (id: string | null)=>void
}){
  const { query, data: list, isLoading } = useQueryData()
  useEffect(()=>{
    const APIUserReview = new CRUD(`/v0/user/${userId}/review`)
    query(APIUserReview.getList())
  },[])

  return <>
    <Autocomplete  className="w-[400px] mb-2"
      isLoading={isLoading}
      name='reviewId'
      label="Ревью"
      defaultSelectedKey={defaultValue ? String(defaultValue) : undefined }
      // onSelectionChange={(v)=> {console.log(v)}}
      onSelectionChange={(key) => {onInput(key as string | null)}}
    >
      {list?.map((item: Review) => 
        <AutocompleteItem key={item.id} >{ 'Ревью ' + item.id }</AutocompleteItem>
      )}
    </Autocomplete>
  </>
}
