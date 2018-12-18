import React from 'react'
import {shallow} from 'enzyme'
import ModalFooter from './'

it('renders children', () => {
  expect(shallow(
    <ModalFooter>
      <p>I feel like a child</p>
    </ModalFooter>
  )).toMatchSnapshot()
})