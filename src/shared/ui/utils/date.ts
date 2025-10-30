import dayjs from 'dayjs'
import {now, getLocalTimeZone, parseDate, ZonedDateTime} from "@internationalized/date";

export function getDateFormateForView(date: Date | null){
  return date && dayjs(date).format('DD.MM.YYYY')
}

// ***********************************************************************

export function dateToDateInput() {
    parseDate(dayjs("2025-10-29T11:10:16.305Z").format('YYYY-MM-DD'))
}

export function dateInputToDate(zonedDateTime: ZonedDateTime){
  return zonedDateTime.toDate()
}
