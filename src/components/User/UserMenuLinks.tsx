'use client'

import { UserGET, ReviewPOST, TaskPOST, User } from "@/types"
import { Button } from "@heroui/react"
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { APIGoal, APIReview } from "@/lib/API"
import UserInfo from './UserInfo'
import { useQueryData } from "@/hooks/useQueryData"
import AlertError from "@/shared/ui/AlertError"
import LoadingAlert from "@/shared/ui/Loader/LoadingAlert"
import { useEffect } from "react"


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

export default function UserMenuLinks({ user }: { user: UserGET }) {
  const router = useRouter();
  useEffect(()=>{ console.log(user.subordinates) }, [])
  const id = user.id;
  const menu = getMenuItems(id);

  return (
    <ul className="list-none flex flex-col">
      {menu.map((item, index) => (
          <Link key={index} href={item.href}>
            <li className="dark:hover:bg-gray-900  hover:bg-gray-200 transition-colors duration-500 rounded-xl px-4 py-2 ">
              {item.label}
            </li>
          </Link>
      ))}
      {user.lead?.id && 
          <Link href={`/users/${user.lead?.id}`}>
            <li className="dark:hover:bg-gray-900  hover:bg-gray-200 transition-colors duration-500 rounded-xl px-4 py-2 ">
              Руководитель {user.lead?.id ? '' : '- не назначен'}
            </li>
          </Link>
      }
      {!!user.subordinates?.length && <>
            <li className="dark:hover:bg-gray-900  hover:bg-gray-200 transition-colors duration-500 rounded-xl px-4 py-2 ">
              Подчиненные
            </li>
            ы
        {user.subordinates.map( (u: User, index: number) => 
          <Link href={`/users/${u.id}`} key={index}>
            <li className="dark:hover:bg-gray-900  hover:bg-gray-200 transition-colors duration-500 rounded-xl px-4 py-2 ">
              <div className="ml-5">
                {u.name || u.email}
              </div>
            </li>
          </Link>
        )}
      </>
      }
    </ul>
  );
}