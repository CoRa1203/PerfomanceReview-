"use client";

import { Review } from "@prisma/client";
import ReviewView from "./Review";
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
} from "@heroui/react";
import React from "react";

export const columns = [
  { name: "НАЧАЛО РЕВЬЮ", uid: "start" },
  { name: "КОНЕЦ РЕВЬЮ", uid: "end" },
  { name: "ПОДВЕДЕНИЕ РЕЗУЛЬТАТОВ", uid: "resultsDate" },
  { name: "СТАТУС", uid: "status" },
  { name: "perfomance", uid: "perfomance" },
  { name: "potential", uid: "potential" },
  { name: "РЕЗУЛЬТАТ", uid: "results" },
  { name: "РЕКОМЕНДАЦИИ", uid: "recommendation" },
];

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const statusMark = {
    active: "success",
    paused: "danger",
  };

  const renderCell = React.useCallback((review, columnKey) => {
    const cellValue = review[columnKey];

    switch (columnKey) {
      case "start":
        return <p>{review.dateStart}</p>;
      case "end":
        return <p>{review.dateEnd}</p>;
      case "resultsDate":
        return <p>{review.dateRes}</p>;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusMark[review.dateRes]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "perfomance":
        return <p>{review.perfomance}</p>;
      case "potential":
        return <p>{review.potential}</p>;
          case "results":
        return <p>{review.potential}</p>;
         case "recommendation":
        return <p>{review.recommendation}</p>;
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
          <TableColumn key={column.uid} >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={reviews}>
        {(review) => (
          <TableRow key={review.id}>
            {(columnKey) => <TableCell>{renderCell(review, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
       
      </Table>
      <div className=" *:mb-5 ">
        {reviews.map((review) => (
          <div key={review.id}>
            <ReviewView review={review} />
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
