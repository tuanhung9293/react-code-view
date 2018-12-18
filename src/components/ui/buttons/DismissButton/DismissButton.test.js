import React from 'react'
import {shallow} from 'enzyme'
import DismissButton from './'

it('renders as a DismissButton', () => {
  expect(shallow(
    <DismissButton />
  )).toMatchSnapshot()
})

it('should DismissButton pass props', () => {
  expect(shallow(
    <DismissButton dataTest="dataTest" />
  )).toMatchSnapshot()
})
