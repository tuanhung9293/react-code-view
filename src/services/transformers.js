
export function objectToUrlParams(obj) {
  if (typeof obj !== 'object' || obj === null) return ''
  const joined = Object.keys(obj)
    .map(key => {
      if (Array.isArray(obj[key])) {
        return obj[key].map(value => `${key}[]=${encodeURIComponent(value)}`).join('&')
      }
      return `${key}=${encodeURIComponent(obj[key])}`
    })
    .join('&')
  return joined.length > 0 ? `?${joined}` : ''
}

export function urlParamsToObject(params) {
  if (typeof params !== 'string' || !params) return {}
  return params
    .trim()
    .replace('?', '')
    .split('&')
    .reduce((params, param) => {
      const parts = param.split('=')
      return {
        ...params,
        [parts[0]]: decodeURIComponent(parts[1])
      }
    }, {})
}