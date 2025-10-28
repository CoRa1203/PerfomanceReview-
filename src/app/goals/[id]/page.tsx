"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Task } from "@prisma/client";
import { APITask } from "@/lib/API/functionAPI";
import FormTasks from "@/components/Forms/FormTasks";
import { Delete, Edit } from "@/components/icons";
import {
  Modal,
  useDisclosure,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";

// const ROOT_URL_API = "http://192.168.137.1:3000/api";
const ROOT_URL_API = process.env.NEXT_PUBLIC_HOST + `/api`;
const url = ROOT_URL_API + "/v0/task";
const urlGoal = ROOT_URL_API + "/v0/goal/";

export default function Goal() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [goal, setGoal] = useState<Task>();
  const [tasks, setTasks] = useState<Task>();
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    async function getGoalData() {
      const data = await APITask.get(id);
      setGoal(data);
    }
    getGoalData();
  }, [id]);

  useEffect(() => {
    async function getTaskData() {
      const response = await fetch(`${urlGoal}/${id}/subtask`, {
        method: "GET",
        headers: { "Content-Type": "json" },
        body: JSON.stringify(tasks),
      });
      const taskData = await response.json();
      setTasks(taskData);
    }
    getTaskData();
  }, [id]);

  async function deleteGoal() {
    await APITask.delete(id);
     router.refresh();
  }

  async function deleteTask(id: string) {
    await APITask.delete(id);
    router.refresh();
  }

  const handleEditGoal = () => {
    router.push(`/goals/${id}/edit`); // открываем форму редактирования
  };

  return (
     <div className="w-full flex flex-col gap-4">
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col flex-1 min-w-0 gap-2"> {/* Добавлены классы для правильного переноса */}
          <h1 className="text-2xl break-words whitespace-normal">{goal?.title}</h1> {/* Разрешен перенос слов */}
          <p className="break-words whitespace-normal">{goal?.description}</p> {/* Разрешен перенос слов */}
        </div>
        <div className="flex gap-2 flex-shrink-0"> {/* Кнопки не сжимаются */}
          <Button onPress={handleEditGoal}>
            <Edit />
          </Button>
          <Button onPress={deleteGoal}>
            <Delete />
          </Button>
        </div>
      </div>
      <div>
        <Button color="primary" onPress={onOpen}>
          Создать задачу
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <FormTasks />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <ul className="space-y-2"> {/* Добавлен отступ между элементами */}
        {tasks?.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-start gap-4 p-4 border-b-1 border-b-blue-100" 
          >
            <div className="flex-1 min-w-0 break-words"> {/* Разрешен перенос текста */}
              <h3 className="text-xl font-medium break-words whitespace-normal"> {/* Перенос заголовка */}
                {task.title}
              </h3>
              <p className="text-gray-600 break-words whitespace-normal mt-1"> {/* Перенос описания */}
                {task.description}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0"> {/* Кнопки не сжимаются */}
              <Button isIconOnly variant="light" onPress={handleEditGoal} size="sm">
                <Edit />
              </Button>
              <Button isIconOnly variant="light" onPress={() => deleteTask(task.id)} size="sm">
                <Delete />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
