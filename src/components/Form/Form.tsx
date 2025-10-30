'use client'

import { useForm, Controller } from "react-hook-form"
import { Button, DatePicker, Form, Input, NumberInput } from "@heroui/react"
import {now, getLocalTimeZone, parseDate, ZonedDateTime} from "@internationalized/date";
import dayjs from 'dayjs'


export function dateToDateInput() {
  parseDate(dayjs("2025-10-29T11:10:16.305Z").format('YYYY-MM-DD'))
}

export function dateInputToDate(zonedDateTime: ZonedDateTime){
  return zonedDateTime.toDate()
}

const [TEXT, DATE, NUMBER] = ['text', 'date', 'number']

export type Field = {
  type:   'text' | 'date' | 'number'
  name:   string
  label:  string
}

{/* <Form fields={fields} defaultValues={review} onSubmit={handleSubmit} ButtonName={'Сохранить'} /> */}
export default function FormComponent({
  fields,
  defaultValues,
  onSubmit,
  ButtonName,
}: {
  fields: Field[],
  defaultValues?: any,
  onSubmit: (data: any)=> void,
  ButtonName?: string,
}){

  
  const fieldsForm = fields.map(field => {
    if (defaultValues) {
      for ( let key in defaultValues) {
        if (field.name === key ){
          return ({...field, defaultValue: defaultValues[key]})
        }
      } 
    }
    return field
  })
  
  // console.log('fields',fields)
  // console.log(fieldsForm)
  // console.log(defaultValues)
  

    const onSubmitForm = (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget));
      console.log(data)
      // setSubmitted(data);
    };

    
    return <>

    <Form className="w-full max-w-xs" onSubmit={onSubmitForm}>

      {fieldsForm.map(field=> 
        {switch(field.type){
            case 'date':
              return <div key={field.name}>
              <DatePicker
                size="sm" className="max-w-[284px]"
                // variant="bordered"
                hideTimeZone
                showMonthAndYearPickers
                // onChange={(date)=>{console.log(date?.toDate())}}
                onChange={(date)=>{date?.toDate()}}
                defaultValue={parseDate(dayjs(field.defaultValue).format('YYYY-MM-DD'))}
                label={field.label}
                name={field.name}
              />
              </div>
            case 'text':
              return <div key={field.name}>
                <Input size="sm" className="max-w-[284px]"
                  name={field.name}
                  type={field.type}
                  label={field.label}
                  defaultValue={field.defaultValue}
                  // {...field}
                />
              </div>
            case 'number':
              return <div key={field.name}>
                <NumberInput size="sm" className="max-w-[284px]"
                  name={field.name}
                  type={field.type}
                  label={field.label}
                  defaultValue={field.defaultValue}
                />
              </div>
            default:
              return <p key={field.name}> Ошибка: поле неопределено </p>  
              // return <p key={field.name}> Ошибка: поле {JSON.stringify(field)} неопределено </p>  
          }
        }
      )}

      <Button type='submit'> { ButtonName || 'Сохранить'} </Button>
    </Form>  
  </>
}
