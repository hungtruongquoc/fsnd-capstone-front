export function formatDate(timestampValue) {
  if (timestampValue) {
    return (new Date(timestampValue)).toLocaleDateString()
  }
  return '-'
}
