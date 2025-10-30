
// 'use client'

// import { Button, DatePicker, Input } from "@heroui/react"
// import { useForm, Controller } from "react-hook-form"

// export type Field = {
//   type:   'text' | 'date' | 'number'
//   name:   string
//   label:  string
// }

// {/* <Form fields={fields} defaultValues={review} onSubmit={handleSubmit} ButtonName={'Сохранить'} /> */}
// export default function Form({
//   fields,
//   defaultValues,
//   onSubmit,
//   ButtonName,
// }: {
//   fields: Field[],
//   defaultValues?: any,
//   onSubmit: (data: any)=> void,
//   ButtonName?: string,
// }){

//   console.log(defaultValues)

//   const { handleSubmit, control } = useForm({defaultValues})
  
//   return <>
//     <form onSubmit={handleSubmit(onSubmit)} className=" *:mb-2 " >

//       {fields.map(i=> (
//         <div key={i.name}>
//           <Controller
//             name={i.name}
//             control={control}
//             // rules={{ required: "Введите дату", valueAsDate: true }}
//             render={({ field }) => (
//               <Input 
//                 className="max-w-[284px]"
//                 {...field}
//                 type={i.type}
//                 label={i.label}
//                 size="sm"
//                 // isInvalid={!!errors.date}
//                 // errorMessage={errors.date?.message}
//               />
//             )}
//           />
//         </div>
//       ))}

//       {/* {inputs.map(i=> {
//         switch(i.type){
//           case 'date':
//             return 
//           case 'text':
//           default:
//             return <p> Ошибка: поле неопределено </p>  
//         }
//       })} */}

//       <Button type='submit'> { ButtonName || 'Сохранить'} </Button>
//     </form>
//   </>
// }
