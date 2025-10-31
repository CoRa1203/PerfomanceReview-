"use client";
import React, { useEffect, useState } from "react";
import { Feedback } from "@/types";

import { useParams, useRouter } from "next/navigation";
import FeedbackPage from "./Feedback";



export default function Goals() {
  
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const params = useParams();
  const id = params.id as string;
  //TODO
  useEffect(() => {
   
  }, []);

  return <FeedbackPage feedbacks={feedbacks} />;
}
