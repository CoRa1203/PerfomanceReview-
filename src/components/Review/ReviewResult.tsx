'use client'

import { Review } from '@/types';
import dayjs from 'dayjs'

export function getDateFormate(date: Date | null){
  return date && dayjs(date).format('DD.MM.YYYY')
}

const types = [
  { x: 1, y: 3, text: 'Нераскрывшийся потенциал ', color: 'yellow', },
  { x: 2, y: 3, text: 'Потенциальная звезда', color: 'green', },
  { x: 3, y: 3, text: 'Звезда компании', color: 'green', },
  
  { x: 1, y: 2, text: 'Неэффективный исполнитель', color: 'red', },
  { x: 2, y: 2, text: 'Надежный профессионал', color: 'yellow',  },
  { x: 3, y: 2, text: 'Ключевой исполнитель', color: 'green', },

  { x: 1, y: 1, text: 'Нестабильный исполнитель', color: 'red', },
  { x: 2, y: 1, text: 'Рядовой сотрудник', color: 'red',  },
  { x: 3, y: 1, text: 'Основной игрок', color: 'yellow',  },
];
  
  // const ReviewDefault = {
  //   perfomance: 2,
  //   potential: 3,
  //   dateStart: new Date(),
  //   dateEnd: new Date(),
  //   user : {
  //     name: 'name'
  //   }
  // }

  function getPoint(perfomance: number, potential: number): Point{
    if (!(perfomance && potential) ){   // если отсутствуют
      return {x: 0, y: 0 }
    }
    // TODO не сходиться...
    /*
    перф        6  / 11  = 5 
    потенциал   12 / 16  = 4 
    */
    const maxPerf = 6
    const maxPotencial = 12


    let [perf, pot ] = [1, 1]

    if (perfomance >= maxPerf * (2/3) ){
      perf=3      
    } else if(perfomance >= maxPerf * (1/3) ){
      perf=2
    } else {
      perf=1
    }


    // if (perfomance >= 8 ){
    //   perf=3      
    // } else if(perfomance >= 5){
    //   perf=2
    // } else if(perfomance >= 4){
    //   perf=1
    // } else {
    //   perf=0
    // }

    // if (potential >= 13 ){
    //   pot=3      
    // } else if(potential >= 8){
    //   pot=2
    // } else if(potential >= 1){
    //   pot=1
    // } else {
    //   pot=0
    // }
    return {x: perf, y: pot }
  }
  
export default function ReviewResult({review}: {review: Review}){

  if (!(review.perfomance && review.potential) ){
    return <p> Результаты отсутствуют </p>
  }

  const [x, y] = [review.perfomance, review.potential]
  const typeUser = (types.filter(i => (i.x === x && i.y === y)))[0].text


  return <>
  <div className='flex items-center justify-center h-full w-full p-2'>
    <div>
      <p>Результаты перфоманс ревью</p>
      <br />
      <UserInfo user={review.user} />
      <p>Оцениваемый период: {getDateFormate(review.dateStart)} - {getDateFormate(review.dateEnd)}</p>
      {/* <p>Результирующие оценки</p> */}
      <p>Результативность - {review.perfomance}</p>
      <p>Потенциал - {review.potential}</p>
      <p>Тип - {typeUser}</p>
      <br />
      <br />
      {/* <NineBoxMatrix x={point.perfomance - 0.5} y={point.potential - 0.5}/> */}
      <Matrix x={x} y={y} />
      <br />
      <br />
      {/* <p>Рекомендации:</p> // TODO */}
      {/* <p>Фидбеки:</p>  // TODO */}
    </div>
  </div>
  </>
}

function UserInfo({user}: {user}){
  return <>
    <p>Сотрудник</p>
    <p>ФИО: {user.name}</p>
  </>
}



type Point = {
  x:  0 | 1 | 2 | 3,
  y:  0 | 1 | 2 | 3,
}

function Matrix({x, y}: Point){

  const categories = [
    { x: 1, y: 3, text: 'Нераскрывшийся потенциал ', color: 'yellow', },
    { x: 2, y: 3, text: 'Потенциальная звезда', color: 'green', },
    { x: 3, y: 3, text: 'Звезда компании', color: 'green', },
    
    { x: 1, y: 2, text: 'Неэффективный исполнитель', color: 'red', },
    { x: 2, y: 2, text: 'Надежный профессионал', color: 'yellow',  },
    { x: 3, y: 2, text: 'Ключевой исполнитель', color: 'green', },

    { x: 1, y: 1, text: 'Нестабильный исполнитель', color: 'red', },
    { x: 2, y: 1, text: 'Рядовой сотрудник', color: 'red',  },
    { x: 3, y: 1, text: 'Основной игрок', color: 'yellow',  },
  ];

  const GRID_DATA = categories.map(i => { 
    if ( i.x === x && i.y === y ){
      return {...i, isCenter: true}
    }
    return i
  })

  return (
      <div 
        className="grid grid-cols-3 gap-4 max-w-md w-full"
        style={{ aspectRatio: '1 / 1' }}
      >
        {GRID_DATA.map((cell, index) => (
          <SkewCorners 
            key={index}
            className={cell.color}
            isCenter={cell.isCenter}
          >
            <span className={`${
              cell.isCenter 
                ? 'text-gray-800 font-bold text-sm underline' 
                : 'text-gray-800 font-medium text-sm'
            }`}>
              {cell.text}
            </span>
          </SkewCorners>
        ))}
      </div>
  );
};

const SkewCorners = ({ children, className = '', isCenter = false }) => {
  return (
    <div 
      // className={`relative ${className}`}
      className={`
        relative rounded-md 
        bg-${className}-${isCenter ? 5 : 2 }00
        ${isCenter && 'border-3 outline-2' }
      `}
    >
      {/* {isCenter && (
        <div 
          className="absolute inset-0 border-2 border-yellow-500 pointer-events-none"
          style={{
            clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)'
          }}
        />
      )} */}
      <div className="flex items-center justify-center h-full w-full p-2">
        {children}
      </div>
    </div>
  );
};


// НЕ УДАЛЯТЬ !!!! иначе тайлвинг сломается
//     <div className='bg-green-200' >  test </div>
//     <div className='bg-yellow-200' >  test </div>
//     <div className='bg-red-200' >  test </div>

//     <div className='bg-green-300' >  test </div>
//     <div className='bg-yellow-300' >  test </div>
//     <div className='bg-red-300' >  test </div>

//     <div className='bg-green-500' >  test </div>
//     <div className='bg-yellow-500' >  test </div>
//     <div className='bg-red-500' >  test </div>
