import React from 'react'
import {shallow} from 'enzyme'
import EditButton from './'

it('renders as a EditButton', () => {
  expect(shallow(
    <EditButton />
  )).toMatchSnapshot()
})

it('should EditButton pass props', () => {
  expect(shallow(
    <EditButton dataTest="dataTest" />
  )).toMatchSnapshot()
})
