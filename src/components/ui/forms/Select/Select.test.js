import React from 'react'
import {shallow} from 'enzyme'
jest.mock('./Select.module.css', () => ({
  wrapper: 'wrapper',
  select: 'select',
  error: 'error',
  slim: 'slim'
}))
import Select from './'

it('renders children', () => {
  expect(shallow(
    <Select>
      <option>One</option>
      <option>Two</option>
    </Select>
  )).toMatchSnapshot()
})

it('renders correctly when hasError', () => {
  expect(shallow(
    <Select hasError={true}>
      <option>One</option>
      <option>Two</option>
    </Select>
  )).toMatchSnapshot()
})