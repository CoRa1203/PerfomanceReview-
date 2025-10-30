"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  useDisclosure,
  Button,
  ModalContent,
  ModalBody,
  Tooltip,
} from "@heroui/react";

import { Add, Delete, Edit, More } from "./icons";
import { Goal } from "@/types";
import { APITask } from "@/lib/API/functionAPI";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import FormGoal from "./Forms/FormGoal";

export const columns = [
  { name: "ЦЕЛЬ", uid: "goal" },
  { name: "ОПИСАНИЕ", uid: "description" },
  { name: "ДЕЙСТВИЯ", uid: "actions" },
];

// export default function Goals() {
//   const [goals, setGoals] = useState<Goal[]>([]);
//   const params = useParams();
//   const id = params.id as string;
//   useEffect(() => {
//     async function getData() {
//       const data = await APITask.getList();
//       setGoals(data.filter((task: Task) => task.isTarget));
//     }
//     getData();
//   }, []);

//   return <GoalsTable goals={goals} />  

// }

export default function GoalsTable({goals}: {goals: Goal[]}) {

  const userId = useParams().userId as string | undefined

  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

 
  async function deleteGoal(goalId: string) {
    await APITask.delete(goalId);
  router.push("/")
  }

  const handleEditGoal = (goalId: string) => {
    router.push(`/goals/${goalId}/edit`);
  };
  const renderCell = React.useCallback((goals: Goal, columnKey: string) => {
    switch (columnKey) {
      case "goal":
        return <div className="truncate max-w-full">{goals.title}</div>;
      case "description":
        return <div className="truncate max-w-full">{goals.description}</div>;
      case "actions":
        return (
          <div className="relative flex items-center justify-end min-w-max">
            <Tooltip content="Детали">
              <Link href={`/goals/${goals.id}`}>
                <Button variant="light" isIconOnly size="sm">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <More />
                  </span>
                </Button>
              </Link>
            </Tooltip>
            <Tooltip content="Редактировать">
              <Button
                variant="light"
                onPress={() => handleEditGoal(goals.id)}
                isIconOnly
                size="sm"
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Edit />
                </span>
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Удалить">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => deleteGoal(goals.id)}
              >
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Delete />
                </span>
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return goals[columnKey as keyof Goal];
    }
  }, []);

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
              <FormGoal 
                goalData={ userId ? 
                  {isTarget: true, executorId: userId, } 
                  : 
                  {isTarget: true}
                }
              />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
      <Table
        aria-label="Example table with custom cells"
        classNames={{
          base: "max-w-full overflow-hidden",
          table: "min-w-full table-fixed",
          wrapper: "overflow-hidden",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "end" : "start"}
              className={
                column.uid === "goal"
                  ? "w-1/5 truncate"
                  : column.uid === "description"
                    ? "w-full truncate"
                    : "w-1/5"
              }
            >
              <div className="truncate">{column.name}</div>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={goals}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell className="w-1/4 max-w-[25%] overflow-hidden">
                {renderCell(item, "goal")}
              </TableCell>
              <TableCell className="w-2/3 max-w-[66%] overflow-hidden">
                {renderCell(item, "description")}
              </TableCell>
              <TableCell className="w-1/12 min-w-max">
                {renderCell(item, "actions")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
