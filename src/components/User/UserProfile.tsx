'use client'

import { UserGET, ReviewPOST, TaskPOST } from "@/types"
import { Button, Link } from "@heroui/react"
import { useRouter } from "next/navigation"
import { APIGoal, APIReview } from "@/lib/API"
import UserInfo from './UserInfo'
import { useQueryData } from "@/hooks/useQueryData"
import AlertError from "@/shared/ui/AlertError"
import LoadingAlert from "@/shared/ui/Loader/LoadingAlert"
import UserMenuLinks from "./UserMenuLinks"


export default function UserProfile({user}: {user: UserGET}){
  const router = useRouter()
  const { query, isLoading, errorMessage } = useQueryData()
  const id = user.id

  function createReview() {
    const newReview: ReviewPOST = {
      employeeId: id,
    };
    APIReview.create(newReview).then((res) => {
      router.push(`/users/${id}/reviews`);
    });
  }

  function createGoal() {
    const newGoal: TaskPOST = {
      executorId: id,
      isTarget: true,
      title: 'Новая цель'
    };
    APIGoal.create(newGoal).then((res) => {
      router.push(`/users/${id}/goals`);
    });
  }

  function editProfile(){
     router.push(`/users/${id}/edit`);
  }

  return <>
    {errorMessage && <AlertError>Не удалось создать</AlertError>}
    {isLoading && <LoadingAlert> Создается.. </LoadingAlert>}


    {user && <>
      {/* <h1 className='text-2xl'>Byajhvfwbz j cjnhelybrt сотрудника</h1> */}
      
      <UserInfo user={user}/>

      <UserMenuLinks user={user} />

      {/* TODO модальные окна добавить */}
      <div className=" mt-5 *:mr-2">
        <Button
          color="primary"
          onPress={() => {
            createReview();
          }}
          >
          Назначить ревью
        </Button>
        <Button
          color="primary"
          onPress={() => {
            createGoal();
          }}
          >
          Поставить цель
        </Button>
         <Button
          color="primary"
          onPress={() => {
            editProfile();
          }}
          >
          Редактировать профиль
        </Button>
      </div>
    </>}
  </>
}
