"use client";

import { Review } from "@prisma/client";
import ReviewView from "./Review";
import dayjs from 'dayjs'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
} from "@heroui/react";
import React from "react";
import Link from "next/link";
import { More } from "../icons";

export const columns = [
  { name: "НАЧАЛО РЕВЬЮ", uid: "start" },
  { name: "КОНЕЦ РЕВЬЮ", uid: "end" },
  { name: "ПОДВЕДЕНИЕ РЕЗУЛЬТАТОВ", uid: "resultsDate" },
  { name: "СТАТУС", uid: "status" },
   { name: "ДЕЙСТВИЯ", uid: "actions" },
  // { name: "perfomance", uid: "perfomance" },
  // { name: "potential", uid: "potential" },
  // { name: "РЕЗУЛЬТАТ", uid: "results" },
  // { name: "РЕКОМЕНДАЦИИ", uid: "recommendation" },
];

export function getDateFormate(date: Date | null){
  return date && dayjs(date).format('DD.MM.YYYY')
}

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const statusColor = {
  true: "success",  
  false: "danger",   
};

const statusText = {
  true: "Завершен",
  false: "Активен",
};

  const renderCell = React.useCallback((review: Review, columnKey: string) => {
    const cellValue = review[columnKey];

    switch (columnKey) {
      case "start":
        return <p>{getDateFormate(review.dateStart)}</p>;
      case "end":
        return <p>{getDateFormate(review.dateEnd)}</p>;
      case "resultsDate":
        return <p>{getDateFormate(review.dateRes)}</p>;
      case "status": {
  const isEnd = Boolean(review.isEnd); // убедимся, что это boolean
  return (
    <Chip
      className="capitalize"
      color={statusColor[isEnd.toString()]} // или используйте напрямую:
      // color={review.isEnd ? "success" : "danger"}
      size="sm"
      variant="flat"
    >
      {statusText[isEnd.toString()]}
    </Chip>
  );
}
      case "perfomance":
        return <p>{review.perfomance}</p>;
         case "actions":
        return (
          <div className="relative flex items-center justify-end min-w-max">
            <Tooltip content="Детали">
              <Link href={`/reviews/${review.id}`}>
                <Button variant="light" isIconOnly size="sm">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <More />
                  </span>
                </Button>
              </Link>
            </Tooltip>
          </div>
        );
      // case "potential":
      //   return <p>{review.potential}</p>;
      //     case "results":
      //   return <p>{review.results}</p>;
      //    case "recommendation":
      //   return <p>{review.recommendation}</p>;
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
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
          <TableColumn className=" whitespace-normal break-words overflow-visible" key={column.uid} >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
     <TableBody>
  {reviews.map((review) => (
    <TableRow key={review.id}>
      <TableCell>{renderCell(review, 'start')}</TableCell>
      <TableCell>{renderCell(review, 'end')}</TableCell>
      <TableCell> {renderCell(review, 'resultsDate')}</TableCell>
      <TableCell>
        <span className={`status-badge ${review.isEnd}`}>
          {renderCell(review, 'status')}
        </span>
      </TableCell>
            <TableCell> {renderCell(review, 'actions')}</TableCell>
      {/* <TableCell>{review.performance|| "-"}</TableCell>
      <TableCell>{review.potential|| "-"}</TableCell>
      <TableCell>{review.results || "-"}</TableCell>
      <TableCell>{review.recommendation || "-"}</TableCell> */}
    </TableRow>
  ))}
</TableBody>
       
      </Table>
      {/* <div className=" *:mb-5 ">
        {reviews.map((review) => (
          <div key={review.id}>
            <ReviewView review={review} />
            <hr />
          </div>
        ))}
      </div> */}
    </>
  );
}
