"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "@heroui/button";
import { APIReview, APIUser, APIUserFull } from "@/lib/API/queryAPI";
import { useQueryData } from "@/hooks/useQueryData";
import { useEffect } from "react";
import { ReviewPOST, User, UserGET } from "@/types";
import LoadingAlert from "@/shared/ui/Loader/LoadingAlert";
import AlertError from "@/shared/ui/AlertError";
// import { Link } from '@heroui/link'
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserMenuLinks from "@/components/User/UserMenuLinks";

export default function Profile() {
  const router = useRouter();
  const session = useSession();
  const userId = session.data?.user?.id;
  // console.log(session)
  const {
    query,
    data: user,
    isLoading,
    errorMessage,
    setErrorMessage,
  } = useQueryData();
  useEffect(() => {
    userId && query(APIUserFull.get(userId));
  }, []);


  function createReview() {
    const id = userId
    if (id) {
      const newReview: ReviewPOST = {
        employeeId: id,
      };
      APIReview.create(newReview).then((res) => {
        router.push(`/users/${id}/reviews`);
      });
    }
  }


  return (
    <>
      {userId ? (
        <div className='flex flex-col  gap-4 '>
          {errorMessage && (
            <AlertError> Не удалось получить пользователя </AlertError>
          )}
          {isLoading && <LoadingAlert />}
          {user && <>
            <h1 className='text-2xl'>Личный кабинет сотрудника</h1>
            <UserMenuLinks user={user} />

            <div>
              <Button
                color="primary"
                onPress={() => {
                  createReview();
                }}
                >
                Пройти ревью
              </Button>
            </div>
          </>}
        </div>
      ) : (
        <NotUser />
      )}
    </>
  );
}

function NotUser(){

  return <>
    <Link href='/login' className="w-full flex items-center justify-center py-3">
      <p>Войдите или зарегистрируйтесь</p>
    </Link>
    {/* <Button onClick={signOut} >Выйти</Button> */}
  </>
}
