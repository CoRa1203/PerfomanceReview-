import React from 'react'
import { Alert } from "@heroui/alert";


export default function AlertError({children}: {children: React.ReactNode}){

    return <Alert color='danger'>Ошибка: {children}</Alert>
}