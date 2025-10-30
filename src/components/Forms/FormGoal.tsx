"use client";

import FormTask, {TaskDefault} from './FormTask'

export default function FormGoal({ goalData }: { goalData?: TaskDefault }) {
  
  return <FormTask goalData={goalData}/>
}
