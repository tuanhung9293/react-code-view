import React from 'react'
import {shallow} from 'enzyme'
import Columns from './'

it('renders children', () => {
  expect(shallow(
    <Columns>
      <p>I feel like a child</p>
    </Columns>
  )).toMatchSnapshot()
})
