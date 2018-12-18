/* global jest */
import 'whatwg-fetch'

export function mockResponse(status, response) {
  return new window.Response(response, {
    status
  })
}

export function mockFetch(status, data) {
  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve(mockResponse(status, data))
  })
}
