"use client";

import { ReviewGET, Review, TaskGET, FeedbackGET } from "@/types";
import { Link } from "@heroui/react";
import dayjs from "dayjs";
import ListFeedback from "./ListFeedback";

export function getDateFormate(date: Date | null) {
  return date && dayjs(date).format("DD.MM.YYYY");
}

export default function ReviewInfo({ review: r }: { review: ReviewGET }) {

  return (
    <>
      <p>Ревью</p>
      {r.dateStart && r.dateEnd && (
        <p>
          Оцениваемый период: {getDateFormate(r.dateStart)} -{" "}
          {getDateFormate(r.dateEnd)}
        </p>
      )}
      {r.recommendation && <p>Рекомендации: {r.recommendation}</p>}
      <p>
        {r.isEnd ? 'Статус - "завершен"' : 'Статус - "активен"'}
      </p>
      <Link href={`/users/${r.employeeId}`}>
        <p>{r.employee?.name ? `Сотрудник - ${r.employee?.name}` : 'Сотрудник'}</p>
      </Link>
    
    </>
  );
}
