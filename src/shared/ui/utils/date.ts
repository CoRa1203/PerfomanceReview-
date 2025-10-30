import dayjs from 'dayjs'

export function getDateFormateForView(date: Date | null){
  return date && dayjs(date).format('DD.MM.YYYY')
}



