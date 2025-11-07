'use client'

import { UserGET } from "@/types"
import { Link } from "@heroui/link"

export default function UserProfile({user}: {user: UserGET}){
  
  return <div className=" *:mb-2 " >
    <p>ФИО: {user.name || '-'} </p>
    <p>email: {user.email} </p>

    {/* <p>
      Руководитель - 
      {user.lead?.id ?
        <Link href={`/users/${user.lead?.id}`}>
          {user.lead?.name || user.lead?.email}
        </Link>    
        :
        ' не назначен'
      }
    </p> */}
  </div>
}
