import React from 'react'
import {shallow} from 'enzyme'
import Loading from './'

it('renders Loading', () => {
  expect(shallow(
    <Loading />
  )).toMatchSnapshot()
})
