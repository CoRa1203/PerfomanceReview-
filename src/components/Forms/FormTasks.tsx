'use client'

import { Button, Input, Textarea } from "@heroui/react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Task } from "@prisma/client";

const ROOT_URL_API = process.env.NEXT_PUBLIC_HOST + `/api`;
const url = ROOT_URL_API + "/v0/task/";
const urlGoal = ROOT_URL_API + "/v0/goal/"

export interface TaskProp {
  id?: number;
  title: string;
  description: string;
  dateStart?: Date;
  dateEnd?: Date;
}

interface IProps {
  taskData?: TaskProp;

}

// api/v1/task/{TargetId}/subtask

export default function FormTasks({ taskData }: IProps) {
  const router = useRouter();
  const params = useParams();
  const goalId = params.id as string;
  // const taskId = params.taskId as string;


  const [newTask, setNewTask] = useState<TaskProp>({
    id: taskData?.id,
    title: taskData?.title || "",
    description: taskData?.description || "",
  });
  

  async function saveTask() {
    if (newTask.id) {
      updateTask();
      router.back()
    } else {
      createTask();
     router.push(`/goals/${goalId}`);
    }
  }


  async function updateTask() {
    // const response = await fetch(`${urlGoal}/${goalId}/subtask`, {
    const response = await fetch(url + newTask.id, {
      headers: { "Content-Type": "json" },
      body: JSON.stringify({
        targetId: +goalId,
        ...newTask,
      }),
      method: "PUT",
    });
    const updatedData = await response.json();
    return updatedData;
  }


  async function createTask() {
    // const response = await fetch(`${urlGoal}/${goalId}/subtask`, {
    const response = await fetch(url, {
      headers: { "Content-Type": "json" },
      body: JSON.stringify({
        targetId: +goalId, //id цели к которой привязывается подзадача
        ...newTask,
      }),
      method: "POST",
    });
    const createdData = await response.json();
    return createdData;
  }



  return (
    <>
      <div className="flex flex-col gap-2 ">
        {taskData?.id ? (
          <h3>Редактирование задачи</h3>
        ) : (
          <h3>Создание задачи</h3>
        )}
        <Input
          isRequired
          isClearable
          // className="max-w-xs"
          //   defaultValue="Название задачи"
          label="Задача"
          placeholder="Введите задачу"
          type="text"
          variant="bordered"
          // eslint-disable-next-line no-console
          onClear={() => console.log("input cleared")}
          value={newTask.title}
          onChange={(e) => {
            setNewTask({ ...newTask, title: e.target.value });
            // if (error) setError(null) // убираем ошибку, когда заполняем поле
          }}
        />
        <Textarea
          isClearable
          // className="max-w-xs"
          //   defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          label="Описание"
          placeholder="Введите описание"
          variant="bordered"
          // eslint-disable-next-line no-console
          onClear={() => console.log("textarea cleared")}
          value={newTask.description}
          onChange={(e) => {
            setNewTask({ ...newTask, description: e.target.value });
            // if (error) setError(null) // убираем ошибку, когда заполняем поле
          }}
        />
         <div className="flex gap-2 pt-2 pb-2">
                  <Button color="primary" type="submit" onPress={saveTask}>
                    {newTask.id ? "Сохранить" : "Создать"}
                  </Button>
                  <Button type="reset" variant="flat" >
                    Отмена
                  </Button>
                </div>
        <div>
        </div>
      </div>
    </>
  );
}
