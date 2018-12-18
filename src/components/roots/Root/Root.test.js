import React from 'react'
import {shallow} from 'enzyme'
import Root from './'


describe('renders', () => {
  it('renders Root', () => {
    expect(shallow(
        <Root />
    )).toMatchSnapshot()
  })
})
