'use client'

import { useForm, Controller } from "react-hook-form"
import { Button, DatePicker, Form, Input, NumberInput, Textarea } from "@heroui/react"
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
  type:   'text' | 'date' | 'number' | 'textarea'
  name:   string
  label:  string
  defaultValue?: any
  required?: boolean
  placeholder?: any
}

{/* <Form fields={fields} defaultValues={review} onSubmit={handleSubmit} ButtonName={'Сохранить'} /> */}
export default function FormComponent({
  fields,
  defaultValues,
  onSubmit,
  ButtonName,
  className,
  classNameitems,
  children,
}: {
  fields: Field[],
  defaultValues?: any,
  onSubmit: (data: object)=> void,
  ButtonName?: string,
  className?: string,
  classNameitems?: string,
  children?: React.ReactNode,
}){

  classNameitems = classNameitems || "w-[284px]"
  
  const fieldsForm: Field[] = fields.map(field => {
    if (defaultValues) {
      for ( let key in defaultValues) {
        if (field.name === key ){
          return ({...field, defaultValue: defaultValues[key]})
        }
      } 
    }
    return field
  })
  
  console.log('fields',fields)
  console.log('fieldsForm', fieldsForm)
  console.log('defaultValues', defaultValues)
  
  const onSubmitForm = (e) => {
    e.preventDefault();
    const dataForm = Object.fromEntries(new FormData(e.currentTarget));
    const data = {
      ...defaultValues,
      ...dataForm,
    }
    onSubmit(data)
  };

  return <>
    <Form className={ className || "w-full max-w-xs"} onSubmit={onSubmitForm}>

      {children}

      {fieldsForm.map(field=> 
        {switch(field.type){
            case 'date':
              return <div key={field.name}>
              <DatePicker
                size="sm" className={classNameitems}
                // variant="bordered"
                hideTimeZone
                showMonthAndYearPickers
                // onChange={(date)=>{console.log(date?.toDate())}}
                // onChange={(d)=>{
                //   const date = d?.toDate(getLocalTimeZone())
                //   return date ? new Date(date) : null
                // }}
                //  по умолчанию ставит сегодняшнюю дату
                // defaultValue={parseDate(dayjs(field.defaultValue).format('YYYY-MM-DD'))}
                defaultValue={field.defaultValue && parseDate(dayjs(field.defaultValue).format('YYYY-MM-DD'))}
                label={field.label}
                name={field.name}
                isRequired={field.required}
              />
              </div>
            case 'text':
              return <div key={field.name}>
                <Input size="sm" className={classNameitems}
                  name={field.name}
                  type={field.type}
                  label={field.label}
                  defaultValue={field.defaultValue}
                  isRequired={field.required}
                  placeholder={field.placeholder}
                  // {...field}
                />
              </div>
            case 'textarea':
              return <div key={field.name}>
                <Textarea size="sm" className={classNameitems}
                  name={field.name}
                  type={field.type}
                  label={field.label}
                  defaultValue={field.defaultValue}
                  isRequired={field.required}
                  placeholder={field.placeholder}
                  // {...field}
                />
              </div>
            case 'number':
              return <div key={field.name}>
                <NumberInput size="sm" className={classNameitems}
                  name={field.name}
                  type={field.type}
                  label={field.label}
                  defaultValue={field.defaultValue}
                  isRequired={field.required}
                  placeholder={field.placeholder}
                />
              </div>
            default:
              return <p key={field.name}> Ошибка: поле неопределено </p>  
              // return <p key={field.name}> Ошибка: поле {JSON.stringify(field)} неопределено </p>  
          }
        }
      )}

      <Button color="primary" className={classNameitems} type='submit'> { ButtonName || 'Сохранить'} </Button>
    </Form>  
  </>
}
