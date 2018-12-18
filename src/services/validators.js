export function required(message = 'This field is required') {
  return value => (
    !value || value.length === 0
  ) && message
}
