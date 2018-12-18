import React from 'react'
import {shallow} from 'enzyme'
import CrossIcon from './'

it('renders CrossIcon with no props', () => {
  expect(shallow(
    <CrossIcon />
  )).toMatchSnapshot()
})

it('renders CrossIcon with props dark', () => {
  expect(shallow(
    <CrossIcon dark />
  )).toMatchSnapshot()
})

it('renders CrossIcon with props dark', () => {
  expect(shallow(
    <CrossIcon small />
  )).toMatchSnapshot()
})

