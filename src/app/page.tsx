"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { APITask } from "@/lib/API/functionAPI";
import { Goal } from "@/types";
import {
  Modal,
  useDisclosure,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import FormGoal from "@/components/Forms/FormGoal";

// const ROOT_URL_API = "http://192.168.137.1:3000/api";
// const url = ROOT_URL_API + "/v0/task";

export default function Home() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    async function getData() {
      const data = await APITask.getList();
      setGoals(data);
    }
    getData();
  }, []);

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Создать цель
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
              <ModalBody>
                <FormGoal />
              </ModalBody>
          )}
        </ModalContent>
      </Modal>
      <div>
        <h2>Цели:</h2>
        <ul>
          {goals.map((goal) => (
            <Link key={goal.id} href={`/goals/${goal.id}`}>
              <li>{goal.title}</li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
