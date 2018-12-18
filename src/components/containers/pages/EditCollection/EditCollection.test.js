import React from 'react'
import {shallow} from 'enzyme'
import EditCollection from './'

describe('renders', () => {
  it('renders EditCollection connected', () => {
    expect(shallow(
      <EditCollection />
    )).toMatchSnapshot()
  })
})

