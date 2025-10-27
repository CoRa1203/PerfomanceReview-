import React from 'react'
import { Alert } from "@heroui/alert";


export default function LoadingAlert({children}: {children: React.ReactNode}){
  return <Alert color='default'>
    {children ?
      children
      :
      'Загрузка..'
    }
  </Alert>
}