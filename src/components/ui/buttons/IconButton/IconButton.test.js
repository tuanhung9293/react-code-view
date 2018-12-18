import React from 'react'
import {shallow} from 'enzyme'
import IconButton from './'

it('renders as a button with children', () => {
  expect(shallow(
    <IconButton>I am child</IconButton>
  )).toMatchSnapshot()
})

it('IconButton should pass props down', () => {
  expect(shallow(
    <IconButton data="data1" data2="data2">I am child</IconButton>
  )).toMatchSnapshot()
})
