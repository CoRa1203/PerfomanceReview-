'use client'

import { Review } from "@prisma/client"
import ReviewView from './Review'

export default function Reviews({reviews}: {reviews: Review[]}){
  
  return <>
    <div className=" *:mb-5 ">
      {reviews.map( review => 
        <div key={review.id}>
          <ReviewView review={review} />
          <hr />
        </div> 
      )}
    </div>
  </>
}
