export type Point = {
  x:  0 | 1 | 2 | 3,
  y:  0 | 1 | 2 | 3,
}

export default function Matrix({x, y}: Point){

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
            // @ts-ignore
            isCenter={cell.isCenter}
          >
            <span className={`${
            // @ts-ignore
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

// @ts-ignore
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
