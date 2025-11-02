'use client'

import { Review, ReviewGET, TaskGET } from '@/types';
import ReviewInfo from '../ReviewInfo';
import ListFeedback from "@/components/Feedback/ListFeedback";
import Matrix, {Point} from './Matrix'
import Text from './Text'
import {types} from './config'
import { getSumPerfomance, getSumPotential } from './lib';
import dayjs from 'dayjs'

export function getDateFormate(date: Date | null){
  return date && dayjs(date).format('DD.MM.YYYY')
}

 
// Component ********************************************************************************************************************************
// Component ********************************************************************************************************************************
// Component ********************************************************************************************************************************
export default function ReviewResult({review}: {review: ReviewGET}){

  const perfomance = getSumPerfomance(review)
  const potential = getSumPotential(review)
  const [x, y] = [perfomance || 1, potential || 1]
  const typeUser = (types.filter(i => (i.x === x && i.y === y)))[0].text

  return <>
  <div className='flex items-center justify-center h-full w-full p-2'>
    <div>
      {/* TODO вывести формулу по которой производится расчет */}
      <p>Результаты перфоманс ревью</p>
      <br />
      <ReviewInfo review={review} />
      <p>Результативность - {perfomance}</p>
      <p>Потенциал - {potential}</p>
      <p>Тип - {typeUser}</p>
      <br />
      <br />
      {/* <NineBoxMatrix x={point.perfomance - 0.5} y={point.potential - 0.5}/> */}
      <Matrix x={x} y={y} />
      <br />
      {review.recommendation ? 
        <>
          <p>Рекомендации:</p>
          <p>{review.recommendation}</p>
        </>
        :
        <></>  
      }  
      <br />
      {/* <p>Фидбеки:</p>  // TODO */}
      { (review.tasks && review.feedbacks ) ?
        <ListFeedback tasks={review.tasks} feedbacks={review.feedbacks} viewResponse={true} />
        :
        <p>Отзывы отсутствуют</p>
      }
    </div>
  </div>
  {/* <br /> */}
  {/* <Text /> */}
  </>
}
