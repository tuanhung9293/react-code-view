import React from 'react'
import {shallow} from 'enzyme'
import LikeButton from './'

it('renders LikeButton with no props', () => {
  expect(shallow(
    <LikeButton />
  )).toMatchSnapshot()
})

it('renders LikeButton with props color', () => {
  expect(shallow(
    <LikeButton color="red" />
  )).toMatchSnapshot()
})

it('LikeButton should pass props down', () => {
  expect(shallow(
    <LikeButton data="data1" data2="data2" />
  )).toMatchSnapshot()
})
