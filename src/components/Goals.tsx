"use client";
import React, { useEffect, useState } from "react";
import GoalsTable from "./GoalTable";
import { Goal } from "@/types";
import { APITask } from "@/lib/API/functionAPI";
import { useParams, useRouter } from "next/navigation";
import { Task } from "@/types";


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
