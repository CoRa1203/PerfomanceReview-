"use client";

import { ReviewGET, Review, TaskGET, FeedbackGET } from "@/types";
import dayjs from "dayjs";
import Link from "next/link";
import ListFeedback from "./ListFeedback";

export function getDateFormate(date: Date | null) {
  return date && dayjs(date).format("DD.MM.YYYY");
}

export default function ReviewView({ review: r }: { review: ReviewGET }) {
  console.log(r) 

  return (
    <>
      {/* <Link href={`/reviews/${r.id}`} className=" *:mb-2 "> */}
        <p>Ревью</p>
        {r.dateStart && r.dateEnd && (
          <p>
            Оцениваемый период: {getDateFormate(r.dateStart)} -{" "}
            {getDateFormate(r.dateEnd)}
          </p>
        )}
        {r.recommendation && <p>Рекомендации: {r.recommendation}</p>}
        {r.isEnd ? 'Статус - "завершен"' : 'Статус - "активен"'}
        <Link href={`/users/${r.employeeId}`}>
          <p>{r.employee?.name ? `Сотрудник - ${r.employee?.name}` : 'Сотрудник'}</p>
        </Link>
      {/* </Link> */}

      <br />
      { (r.tasks && r.feedbacks ) ?
        <ListFeedback tasks={r.tasks} feedbacks={r.feedbacks} />
        :
        <>отсутствуют</>
      }
    </>
  );
}
