// 'use client'

// import { useEffect } from 'react'
// import { Autocomplete, AutocompleteItem } from '@heroui/react'
// import { useQueryData } from '@/hooks/useQueryData'
// import { APIUser } from '@/lib/API'
// import { User } from '@/types'

// export default function InputUser(){
//   const { query, data: users, isLoading } = useQueryData()
//   useEffect(()=>{
//     query(APIUser.getList())
//   },[])

//   return <>
//     <Autocomplete
//       isLoading={isLoading}
//       onInputChange={console.log}
//     >
//       {users?.map((user: User) => 
//         <AutocompleteItem key={user.id} >{user.name || user.email}</AutocompleteItem>
//       )}
//     </Autocomplete>
//   </>
// }
