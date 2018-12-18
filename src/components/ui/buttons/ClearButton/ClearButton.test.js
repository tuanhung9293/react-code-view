import React from 'react'
import {shallow} from 'enzyme'
import ClearButton from './'

it('renders as a button with children', () => {
  expect(shallow(
    <ClearButton>I am child</ClearButton>
  )).toMatchSnapshot()
})

it('overrides className', () => {
  expect(shallow(
    <ClearButton className="i-should-not-be-there">I am child</ClearButton>
  )).toMatchSnapshot()
})

it('renders as disabled', () => {
  expect(shallow(
    <ClearButton disabled>I am child</ClearButton>
  )).toMatchSnapshot()
})

it('renders as noOutline', () => {
  expect(shallow(
    <ClearButton noOutline>I am child</ClearButton>
  )).toMatchSnapshot()
})
