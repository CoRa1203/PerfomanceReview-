"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "@heroui/button";
import { APIReview, APIUser } from "@/lib/API/queryAPI";
import { useQueryData } from "@/hooks/useQueryData";
import { useEffect } from "react";
import { ReviewPOST, User } from "@/types";
import LoadingAlert from "@/shared/ui/Loader/LoadingAlert";
import AlertError from "@/shared/ui/AlertError";
// import { Link } from '@heroui/link'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
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
    userId && query(APIUser.get(userId));
  }, []);

  return (
    <>
      {userId ? (
        <>
          {errorMessage && (
            <AlertError> Не удалось получить пользователя </AlertError>
          )}
          {isLoading && <LoadingAlert />}
          {user && <UserProfile user={user} />}
        </>
      ) : (
        <NotUser />
      )}
    </>
  );
}

function NotUser() {
  return (
    <>
      <p>Войдите или зарегистрируйтесь</p>
      <Button onClick={signOut}>Выйти</Button>
    </>
  );
}

//  - мои цели
//   /users/[userId]/goals
//   <!-- /goals -->
//   - мои задачи
//   /users/[userId]/tasks
//   <!-- /tasks -->
//   - мои ревью
//   /users/[userId]/rewiews
//   <!-- /rewiews -->
//   * активное ревью (отображается если сейчас есть активное ревью)
const menu = [
  {
    label: "Ревью",
    href: "/users/[userId]/reviews", // /reviews
  },
  {
    label: "Цели",
    href: "/users/[userId]/goals", // /goals
  },
  // {
  //   label: "Задачи",
  //   href: "/users/[userId]/tasks",
  // },
  // {
  //   label: "Подчиненные",
  // },
  // {
  //   label: "Руководитель",
  // },
];

function getMenuItems(id: string | number) {
  return menu.map((i) => ({
    ...i,
    href: i.href.replace("[userId]", String(id)),
  }));
}

function UserProfile({ user }: { user: User }) {
  const id = user.id;
  const menu = getMenuItems(id);

  const router = useRouter();
  function createReview() {
    const newReview: ReviewPOST = {
      employeeId: id,
    };
    APIReview.create(newReview).then((res) => {
      router.push(`/users/${id}/reviews`);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className='text-2xl'>Личный кабинет сотрудника</h1>
      <div>
        {menu.map((item, index) => (
          <ul key={index} className="list-none">
            <Link href={item.href}>
              <li className="dark:hover:bg-gray-900  hover:bg-gray-200 transition-colors duration-500 rounded-xl px-4 py-2 ">
                {item.label}
              </li>
            </Link>
          </ul>
        ))}
      </div>
      {/* <Link key={index} href={item.href} ><p>{item.label}</p></Link> */}
 
      {/* TODO перенести кнопку создания ревью в другое место */}
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
    </div>
  );
}

// import { auth } from "@/config/auth";

// export default async function ProfileTest(){
//   const session = await auth()
//   const userId = session?.user?.id
//   console.log(session)

//   return <>
//     <p>ProfileTest Server</p>
//     <p>{userId}</p>
//   </>
// }
