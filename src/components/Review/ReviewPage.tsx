"use client";

import { ReviewGET, Review, TaskGET, FeedbackGET } from "@/types";
import ReviewInfo from "./ReviewInfo";
import ListFeedback from "@/components/Feedback/ListFeedback";

export default function ReviewPage({ review }: { review: ReviewGET }) {
  // console.log(review) 

  return (
    <>
      <ReviewInfo review={review}/>

      <br />
      
      {/* Список отзывов */}
      { (review.tasks && review.feedbacks ) ?
        <ListFeedback tasks={review.tasks} feedbacks={review.feedbacks} />
        :
        <p>Отзывы отсутствуют</p>
      }
    </>
  );
}
