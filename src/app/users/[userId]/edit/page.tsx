"use client";

import { APIUser } from "@/lib/API";
import { Button, Input } from "@heroui/react";
import { User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//TODO написать функцию отправки
//TODO добавить редирект при сохранении пользователя
//TODO добавить вывод текста "у вас произошла ошибка, попробуйте позже (польз не сохр или нет интернета) - протестировать при отключении интернета"
//TODO сделать состояние isLoading где будет дизэбл формы и выводжиться надпись "сохранение"

const ROOT_URL_API = process.env.NEXT_PUBLIC_HOST + `/api`;
const url = ROOT_URL_API + "/v0/user";

async function getProfileData(id: string) {
  const profileData = await APIUser.get(id);
  return profileData;
}

export default function EditPrifile() {
  const params = useParams();
  const userId = params.userId as string;
  const [user, setUser] = useState<User | undefined>();
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function saveData(id: string, user: User) {
    // APIUser.edit(id, user);
    try {
      setErrorMessage(false);
      setIsLoading(true);
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "json" },
        body: JSON.stringify(user),
      });
      await response.json();
      router.push("/cabinet");
    } catch (error) {
      setErrorMessage(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfileData(userId).then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <>
      {user === undefined ? (
        "Идет загрузка..."
      ) : (
        <>
          {errorMessage && <p>Произошла ошибка, попробуйте позже</p>}
          <ProfileForm
            isLoading={isLoading}
            defaultUserData={user}
            userId={userId}
            saveBtn={saveData}
          />
        </>
      )}
    </>
  );
}

function ProfileForm({
  defaultUserData,
  saveBtn,
  userId,
  isLoading,
}: {
  defaultUserData: User;
  userId: string;
  saveBtn: (id: string, data: User) => void;
  isLoading: boolean;
}) {
  const [user, setUser] = useState<User>(defaultUserData);

  return (
    <>
      {isLoading && <p>Сохраняем данные...</p>}
      <Input
        isDisabled={isLoading}
        size="sm"
        name="name"
        type="text"
        label="ФИО пользователя"
        value={user.name || ""}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <Input
        isDisabled={isLoading}
        size="sm"
        name="email"
        type="text"
        label="email пользователя"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Button
        isDisabled={isLoading}
        color="primary"
        onPress={() => saveBtn(userId, user)}
      >
        Отправить
      </Button>
    </>
  );
}
