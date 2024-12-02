import { fromUnixTime, format } from 'date-fns'

export function unixTimestampToDate(t: number): string {
  const date = fromUnixTime(t)
  return format(date, 'EEE, MMM d')
}

export function unixTimestampToTime(t: number): string {
  const date = fromUnixTime(t)
  return format(date, 'h:mmaaa')
}

export function unixTimestampToString(t: number, fstring: string): string {
  const date = fromUnixTime(t)
  return format(date, fstring)
}
