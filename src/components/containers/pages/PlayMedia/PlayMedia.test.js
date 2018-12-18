import React from 'react'
import {shallow} from 'enzyme'
import PlayMedia from './'

describe('renders', () => {
  it('renders PlayMedia', () => {
    expect(shallow(
      <PlayMedia />
    )).toMatchSnapshot()
  })
})

