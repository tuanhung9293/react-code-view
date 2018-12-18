import React from 'react'
import {shallow} from 'enzyme'
import PlayButton from './'

it('renders PlayButton with props to', () => {
  expect(shallow(
    <PlayButton to="/collection" />
  )).toMatchSnapshot()
})

it('PlayButton should pass props down', () => {
  expect(shallow(
    <PlayButton to="/collection" data="data1" data2="data2" />
  )).toMatchSnapshot()
})
