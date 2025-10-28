"use client";
import {
  Modal,
  useDisclosure,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  Tooltip,
} from "@heroui/react";
import FormGoal from "@/components/Forms/FormGoal";

import { Add } from "@/components/icons";
import GoalTable from "@/components/GoalTable";

// const ROOT_URL_API = "http://192.168.137.1:3000/api";
// const url = ROOT_URL_API + "/v0/task";

export default function Home() {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between items-center">
        <h1 className="text-2xl">Цели</h1>
        <Tooltip content="Создать цель">
          <Button isIconOnly color="primary" onPress={onOpen}>
            <Add />
          </Button>
        </Tooltip>
      </div>
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
        <GoalTable />
      </div>
    </div>
  );
}
