import React from 'react'
import {shallow} from 'enzyme'
import Checkbox from './'

it('renders Checkbox', () => {
  expect(shallow(
    <Checkbox />
  )).toMatchSnapshot()
})

it('Checkbox should pass props down', () => {
  expect(shallow(
    <Checkbox data="data1" data2="data2" />
  )).toMatchSnapshot()
})
