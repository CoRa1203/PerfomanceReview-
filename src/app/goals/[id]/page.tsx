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

export default function Goal() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [goal, setGoal] = useState<Task>();
  // const [tasks, setTasks] = useState<Task>();
    const [allTasks, setAllTasks] = useState<Task[]>([]); // Все задачи
  const [tasks, setTasks] = useState<Task[]>([]); // Только подзадачи этой цели

  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    async function getGoalData() {
      const data = await APITask.get(id);
      setGoal(data);
    }
    getGoalData();
  }, [id]);

  useEffect(() => {
    async function getTaskData(){
      const data = await APITask.get(id);
      setTasks(data);
    }
    getTaskData()
  }, [id]);

  async function deleteGoal() {
    await APITask.delete(id);
    router.push("/goals");
  }

  const handleEdit = () => {
    router.push(`/goals/${id}/edit`); // открываем форму редактирования
  };



  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-4 justify-between">
        <div>
          <h1>{goal?.title}</h1>
          <p>{goal?.description}</p>
        </div>
        <div className="flex gap-2">
          <Button onPress={handleEdit} >
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
      <ul>
        {tasks?.map((task) => (

        ))}
      </ul>
    </div>
  );
}
