import { Button, Input, Textarea } from "@heroui/react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Task } from "@prisma/client";

const ROOT_URL_API = "http://192.168.137.1:3000/api";
const url = ROOT_URL_API + "/v0/task/{TargetId}/subtask";

interface IProps {
  taskData?: Task;
}

// api/v1/task/{TargetId}/subtask

export default function FormTasks({ taskData }: IProps) {
  const params = useParams();
  const id = params.id as string;

  const [newTask, setNewTask] = useState({
    id: taskData?.id,
    title: taskData?.title || "",
    description: taskData?.description || "",
    isTarget: false,
  });

  async function saveTask() {
    if (newTask.id) {
      updateTask();
    } else {
      createTask();
    }
  }


  async function updateTask() {
    const response = await fetch(url, {
      headers: { "Content-Type": "json" },
      body: JSON.stringify({
        targetId: id,
        ...newTask,
      }),
      method: "PUT",
    });
    const updatedData = await response.json();
    return updatedData;
  }

  async function createTask() {
    const response = await fetch(url, {
      headers: { "Content-Type": "json" },
      body: JSON.stringify({
        targetId: id,
        ...newTask,
      }),
      method: "POST",
    });
    const updatedData = await response.json();
    return updatedData;
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
        <div>
          <Button color="primary" onPress={saveTask}>
            Сохранить
          </Button>
        </div>
      </div>
    </>
  );
}
