export const timeAgo = (dateString) => {
  const now = new Date()
  const past = new Date(dateString)
  const diffInSeconds = Math.floor((now - past) / 1000)

  const minute = 60
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (diffInSeconds < minute) return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`
  if (diffInSeconds < hour) return `${Math.floor(diffInSeconds / minute)} minute${Math.floor(diffInSeconds / minute) !== 1 ? 's' : ''} ago`
  if (diffInSeconds < day) return `${Math.floor(diffInSeconds / hour)} hour${Math.floor(diffInSeconds / hour) !== 1 ? 's' : ''} ago`
  if (diffInSeconds < week) return `${Math.floor(diffInSeconds / day)} day${Math.floor(diffInSeconds / day) !== 1 ? 's' : ''} ago`
  if (diffInSeconds < month) return `${Math.floor(diffInSeconds / week)} week${Math.floor(diffInSeconds / week) !== 1 ? 's' : ''} ago`
  if (diffInSeconds < year) return `${Math.floor(diffInSeconds / month)} month${Math.floor(diffInSeconds / month) !== 1 ? 's' : ''} ago`

  return `${Math.floor(diffInSeconds / year)} year${Math.floor(diffInSeconds / year) !== 1 ? 's' : ''} ago`
}
