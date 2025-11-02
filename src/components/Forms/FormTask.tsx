"use client";

import React, { useState } from "react";
import { Autocomplete, AutocompleteItem, Textarea } from "@heroui/react";
import { Input, Button, ModalHeader } from "@heroui/react";
import { DatePicker } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import { APITask } from "@/lib/API/functionAPI";
import { Task } from "@prisma/client";
import Form, {Field} from '@/components/Form'
import { useQueryData } from "@/hooks/useQueryData";
import AlertError from "@/shared/ui/AlertError";
import LoadingAlert from "@/shared/ui/Loader/LoadingAlert";
import InputReviewUser from "../Inputs/InputReviewUser";

const fields: Field[] = [
  {
    type: 'text',
    name: 'title',
    label: 'Цель',
    placeholder: "Введите цель"
  },
  {
    type: 'date',
    name: 'dateStart',
    label: 'Дата начала',
  },
  {
    type: 'date',
    name: 'dateEnd',
    label: 'Дата завершения',
  },
  {
    type: 'textarea',
    name: 'description',
    label: 'Описание',
  },
  {
    type: 'number',
    name: 'progress',
    label: '% выполнения',
  },
  {
    type: 'number',
    name: 'coefficient',
    label: 'Коэфициент',
  },
  {
    type: 'text',
    name: 'project',
    label: 'Проект',
  },
  // {
  //   name: 'reviewId',
  // },
]

export type TaskDefault = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  isTarget?: boolean | null;
  title?: string;
  description?: string | null;
  dateStart?: Date | null;
  dateEnd?: Date | null;
  link?: string | null;
  progress?: number;
  coefficient?: number;
  project?: string | null;
  authorId?: string | null;
  executorId?: string | null;
  targetId?: number | null;
  reviewId?: number | null;
}

export default function FormTask({ goalData }: { goalData?: TaskDefault }) {
  const router = useRouter();
  const { query, isLoading, errorMessage } = useQueryData()
  const [ reviewId, setReviewId ] = useState<string | null>()

  async function save(data) {
    // console.log('save', data)
    const dateTask = {
      ...data,
      dateStart: data.dateStart ? new Date(data.dateStart) : null,
      dateEnd: data.dateEnd ? new Date(data.dateEnd) : null,

      coefficient: data.coefficient ? +data.coefficient : 1,
      progress: data.progress ? +data.progress : 0,

      reviewId: reviewId ? +reviewId : undefined,
    }
    // console.log('dateTask', dateTask)

    if (data.id) { 
      query(
        APITask.update(dateTask.id, dateTask)
        .then(res => {
          // router.back()
          router.push(`/goals/${dateTask.id}`); 
        })
      )
    } else {
      query(
        APITask.create(dateTask)
        .then(res => {
          // router.back()
          router.push(`/goals/${res.id}`);
        })
      )  
    }
  }

  function handleCancel() {
    router.back();
  }

  return (
    <>
      <div className="pt-2 pb-2">
        {goalData?.id ? <h3>Редактирование цели</h3> : <h3>Создание цели</h3>}
        {errorMessage && <AlertError/>}
        {isLoading && <LoadingAlert />}
        {/* <p> Исполнитель {goalData?.executorId} </p> */}
      </div>
      
      { (goalData?.executorId && goalData.isTarget) && 
        <InputReviewUser 
          userId={goalData?.executorId}
          defaultValue={goalData.reviewId}
          onInput={setReviewId} 
        /> 
      }
      <Form 
        fields={fields} 
        defaultValues={goalData} 
        onSubmit={save} 
        classNameitems="w-[400px]"
      >
      </Form>
    </>
  );
}
