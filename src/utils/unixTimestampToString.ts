import { fromUnixTime, format } from 'date-fns'
export default function unixTimestampToString(t: number): string {
  const date = fromUnixTime(t)
  return format(date, 'EEE, MMM d')
}
