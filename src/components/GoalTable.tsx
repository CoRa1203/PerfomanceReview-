import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
} from "@heroui/react";
import { Delete, Edit, More } from "./icons";
import { Goal } from "@/types";
import { APITask } from "@/lib/API/functionAPI";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export const columns = [
  { name: "ЦЕЛЬ", uid: "goal" },
  { name: "ОПИСАНИЕ", uid: "description" },
  { name: "ДЕЙСТВИЯ", uid: "actions" },
];

export default function GoalTable() {
  const [goals, setGoals] = useState<Goal[]>([]);
    const [goal, setGoal] = useState<Goal[]>([]);
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const data = await APITask.getList();
      setGoals(data);
    }
    getData();
  }, []);

  async function deleteGoal(goalId: string) {
    await APITask.delete(goalId);
    const data = await APITask.getList();
    setGoals(data);
  }

   const handleEditGoal = (goalId: string) => {
    router.push(`/goals/${goalId}/edit`);
  };
  const renderCell = React.useCallback((goal: Goal, columnKey: string) => {
    switch (columnKey) {
      case "goal":
        return <div className="truncate max-w-full">{goal.title}</div>;
      case "description":
        return <div className="truncate max-w-full">{goal.description}</div>;
      case "actions":
        return (
          <div className="relative flex items-center justify-end min-w-max">
            <Tooltip content="Детали">
              <Link href={`/goals/${goal.id}`}>
                <Button variant="light" isIconOnly size="sm">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <More />
                  </span>
                </Button>
              </Link>
            </Tooltip>
            <Tooltip content="Редактировать">
              <Button variant="light"   onPress={() => handleEditGoal(goal.id)} isIconOnly size="sm">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Edit />
                </span>
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Удалить">
              <Button isIconOnly variant="light" size="sm" onPress={() => deleteGoal(goal.id)}>
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Delete />
                </span>
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return goal[columnKey as keyof Goal];
    }
  }, []);

  return (
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
  );
}
