"use client";

import { APIUser } from "@/lib/API";
import { Input } from "@heroui/input";
import { User } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

//редактирвание профиля польователя

// TODO сделать форму редактирования

// TODO получить данные - передать в форму данные

async function getProifileData(id: string): Promise<User> {
  console.log("getProifileData");
  const getData: User = await APIUser.get(id);
  console.log(getData);
  //   APIUser.get(id).then(res => {console.log(res)});
  return getData;
}

// TODO сохранить новые данные
function saveProfileDat(user: User) {
  console.log("saveProfileDat");
  console.log(user);
}

export default function EditProfile() {
  const params = useParams();
  const userId = params.userId as string;

  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const userPromise = getProifileData(userId).then((res) => {
      console.log(res);
      setUser(res);
    });
    console.log("userPromise", userPromise);
  }, []);

  return (
    <>
      {user === undefined ? (
        "loading"
      ) : (
        <ProfileForm defaultUser={user} saveBtn={saveProfileDat} />
      )}
    </>
  );
}

function ProfileForm({
  defaultUser,
  saveBtn,
}: {
  defaultUser: User;
  saveBtn: (data: User) => void;
}) {
  const [user, setUser] = useState(defaultUser);

  const handleBtn = () => saveBtn(user);
  const handlInput = (e) => setUser({ ...user, email: e.target.value });

  return (
    <>
      <Input
        size="sm"
        name="name"
        type="text"
        label="ФИО пользователя"
        value={user.name || ""}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <Input
        size="sm"
        name="email"
        type="text"
        label="email пользователя"
        value={user.email || ""}
        // onChange={(e) => setUser({ ...user, email: e.target.value })}
        onChange={handlInput}
      />
      {/* <button onClick={() => saveBtn(user)}>Отправить</button> */}
      <button onClick={handleBtn}>Отправить</button>
    </>
  );
}
