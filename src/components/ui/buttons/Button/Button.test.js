import React from 'react'
import {shallow} from 'enzyme'
import Button from './'

it('renders children', () => {
  expect(shallow(
    <Button>I am your child</Button>
  )).toMatchSnapshot()
})

it('renders as a link when to prop is provided', () => {
  expect(shallow(
    <Button to="/my-path">I am your child</Button>
  )).toMatchSnapshot()
})

it('renders as an anchor when href prop is provided', () => {
  expect(shallow(
    <Button href="https://someurl.com">I am your child</Button>
  )).toMatchSnapshot()
})

it('renders as disabled', () => {
  expect(shallow(
    <Button disabled>I am your child</Button>
  )).toMatchSnapshot()
})

it('renders as disabled also as a link', () => {
  expect(shallow(
    <Button to="/hello" disabled>I am your child</Button>
  )).toMatchSnapshot()
})

it('prevents default when disabled link is clicked', () => {
  const preventDefault = jest.fn()
  const wrapper = shallow(
    <Button to="/hello" disabled>I am your child</Button>
  )
  wrapper.simulate('click', {preventDefault})
  expect(preventDefault).toBeCalled()
})