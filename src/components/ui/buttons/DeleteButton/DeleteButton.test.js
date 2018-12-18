import React from 'react'
import {shallow} from 'enzyme'
import DeleteButton from './'

it('renders as a DeleteButton', () => {
  expect(shallow(
    <DeleteButton />
  )).toMatchSnapshot()
})

it('should DeleteButton pass props', () => {
  expect(shallow(
    <DeleteButton dataTest="dataTest" />
  )).toMatchSnapshot()
})
