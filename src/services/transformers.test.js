
import {objectToUrlParams, urlParamsToObject} from './transformers'

describe('objectToUrlParams', () => {
  it('makes url params from flat objects', () => {
    expect(objectToUrlParams({
      testing: 'test',
      another: 'something'
    })).toEqual('?testing=test&another=something')
  })
  it('escapes params', () => {
    expect(objectToUrlParams({
      email: 'test@example.com'
    })).toEqual('?email=test%40example.com')
  })
  it('handles array values', () => {
    expect(objectToUrlParams({
      testing: ['array', 'of', 'values']
    })).toEqual('?testing[]=array&testing[]=of&testing[]=values')
    expect(objectToUrlParams({
      before: 'something',
      testing: ['array', 'of', 'values'],
      after: 'something-else'
    })).toEqual('?before=something&testing[]=array&testing[]=of&testing[]=values&after=something-else')
  })
  it('returns empty if params is not an object', () => {
    expect(objectToUrlParams('hello')).toEqual('')
    expect(objectToUrlParams(null)).toEqual('')
    expect(objectToUrlParams(undefined)).toEqual('')
    expect(objectToUrlParams(true)).toEqual('')
    expect(objectToUrlParams(123)).toEqual('')
  })
})

describe('urlParamsToObject', () => {
  it('makes an object of the url params', () => {
    expect(urlParamsToObject('?token=secret&test=testing')).toEqual({
      token: 'secret',
      test: 'testing'
    })
  })
  it('handles escaped params', () => {
    expect(urlParamsToObject('?email=test%40example.com')).toEqual({
      email: 'test@example.com'
    })
  })
  it('handles empty params', () => {
    expect(urlParamsToObject('')).toEqual({})
  })
})