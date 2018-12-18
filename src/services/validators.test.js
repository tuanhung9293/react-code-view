import {required} from './validators'

describe('required', () => {
  it('takes a message and returns error message on falsy values', () => {
    const validate = required('test message')
    expect(validate('')).toEqual('test message')
    expect(validate(null)).toEqual('test message')
    expect(validate(undefined)).toEqual('test message')
    expect(validate(false)).toEqual('test message')
  })

  it('returns false if value is truthy', () => {
    const validate = required('test message')
    expect(validate('hello')).toEqual(false)
  })

  it('provides a default message', () => {
    const validate = required()
    expect(validate('')).toMatchSnapshot()
  })
})
