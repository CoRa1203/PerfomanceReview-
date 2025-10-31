'use client'

import ButtonLink from "@/shared/ui/ButtonLink"

export default function AdminCabinet(){
  return <>
    {/* TODO */}
    {/* <ButtonLink href='/admin/reviews/start' > Запустить всеобщее Ревью</ButtonLink>   */}
    <ButtonLink href='/reviews' > Ревью </ButtonLink>  
    <ButtonLink href='/goals' > Цели </ButtonLink>  
    <ButtonLink href='/users' > Пользователи </ButtonLink>  
  </>
}
