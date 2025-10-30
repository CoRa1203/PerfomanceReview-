"use client";
import React, { useState } from "react";
import { Autocomplete, AutocompleteItem, Textarea } from "@heroui/react";
import { Form, Input, Button, ModalHeader } from "@heroui/react";
import { DatePicker } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import { APITask } from "@/lib/API/functionAPI";
import { Task } from "@prisma/client";

const ROOT_URL_API = "http://192.168.137.1:3000/api";
const url = ROOT_URL_API + "/v0/task";

export interface Goal {
  id?: number;
  title: string;
  description: string;
  dateStart?: Date;
  dateEnd?: Date;
  isTarget: true;
}


interface IProps {
  goalData?: Goal;
}

export default function FormGoal({ goalData }: IProps) {
  const [action, setAction] = React.useState<string | null>(null);
  const [goalApi, setGoaApi] = React.useState([]);

  const [newGoal, setNewGoal] = useState<Goal>({
    id: goalData?.id,
    title: goalData?.title || "",
    description: goalData?.description || "",
    dateStart: goalData?.dateStart,
    dateEnd: goalData?.dateEnd,
    isTarget: true,
  });

  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  async function saveGoal() {
    if (newGoal.id) {
      updateGoal();
      router.push(`/goals/${id}`);
    } else {
  
      const createdGoal = await createGoal();
      router.push(`/goals/${createdGoal.id}`);
    }
  }

  async function getData(){
    const getData = await APITask.getList()
    setGoaApi(getData);

  }

  async function createGoal() {
    const postGoal = await APITask.create(newGoal);
    return postGoal;
  }

  async function updateGoal() {
    const updatedData = await APITask.update(id, newGoal);
    return updatedData;
  }

  function handleCancel() {
    if (id) {
      router.push(`/goals/${id}`);
    } else {
      router.back();
    }
  }
  return (
    <>
      <div className="pt-2 pb-2">
        {newGoal.id ? <h3>Редактирование цели</h3> : <h3>Создание цели</h3>}
      </div>
      <Form
        className="w-full flex flex-col gap-4"
        onReset={() => setAction("")}
        onSubmit={(e) => {
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.currentTarget));

          setAction(`submit ${JSON.stringify(data)}`);
        }}
      >
        <Input
          isRequired
          isClearable
          className="max-w-xs"
          label="Цель"
          placeholder="Введите цель"
          type="text"
          variant="bordered"
          onClear={() => console.log("input cleared")}
          value={newGoal.title}
          onChange={(e) => {
            setNewGoal({ ...newGoal, title: e.target.value });
            // if (error) setError(null) // убираем ошибку, когда заполняем поле
          }}
        />
        <DatePicker className="max-w-[284px]" label="Birth date" />
        <DatePicker className="max-w-[284px]" label="Birth date" />
        <Textarea
          isClearable
          className="max-w-xs"
          label="Одижаемый результат"
          placeholder="Введите одижаемый результат"
          variant="bordered"
          onClear={() => console.log("textarea cleared")}
          value={newGoal.description}
          onChange={(e) => {
            setNewGoal({ ...newGoal, description: e.target.value });
            // if (error) setError(null) // убираем ошибку, когда заполняем поле
          }}
        />
        <div className="flex gap-2 pt-2 pb-2">
          <Button color="primary" type="submit" onPress={saveGoal}>
            {newGoal.id ? "Сохранить" : "Создать"}
          </Button>
          <Button type="reset" variant="flat" onPress={handleCancel}>
            Отмена
          </Button>
        </div>
      </Form>
    </>
  );
}
