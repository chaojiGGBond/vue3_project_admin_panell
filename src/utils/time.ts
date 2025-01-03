export const getTime = (): string => {
  let hours: number = new Date().getHours()
  let message = ''
  if (hours >= 5 && hours <= 12) {
    message = 'morning'
  } else if (hours > 12 && hours <= 18) {
    message = 'afternoon'
  } else if (hours > 18 && hours <= 23) {
    message = 'evening'
  } else {
    message = 'night'
  }
  return message
}
