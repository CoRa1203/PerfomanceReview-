"use client";
import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Modal,
//   useDisclosure,
//   Button,
//   ModalContent,
//   ModalBody,
//   Tooltip,
// } from "@heroui/react";
import GoalsTable from "./GoalTable";

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

export default function Goals() {
  
  const [goals, setGoals] = useState<Goal[]>([]);
  const params = useParams();
  const id = params.id as string;
  useEffect(() => {
    async function getData() {
      const data = await APITask.getList();
      setGoals(data.filter((task: Task) => task.isTarget));
    }
    getData();
  }, []);

  return <GoalsTable goals={goals} />;
}
