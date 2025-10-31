"use client";

import { Review } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";

export function getDateFormate(date: Date | null) {
  return date && dayjs(date).format("DD.MM.YYYY");
}

export default function ReviewView({ review: r }: { review: Review }) {
  return (
    <>
      <Link href={`/reviews/${r.id}`} className=" *:mb-2 ">
        <p>Ревью</p>
        {/* <p>{r.id}</p> */}
        {r.employee && <p> Исполнитель {r.employee}</p>}
        {r.dateStart && r.dateEnd && (
          <p>
            Оцениваемый период: {getDateFormate(r.dateStart)} -{" "}
            {getDateFormate(r.dateEnd)}
          </p>
        )}
        {r.recommendation && <p>Рекомендации: {r.recommendation}</p>}
        {r.isEnd ? 'Статус - "завершен"' : 'Статус - "активен"'}
        <Link href={`/users/${r.employeeId}`}>
          <p>{r.employee?.name ? `Сотрудник` : }Сотрудник {r.employee?.name}</p>
        </Link>
      </Link>
    </>
  );
}
