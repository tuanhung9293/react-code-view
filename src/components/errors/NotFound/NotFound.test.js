import React from 'react'
import {shallow} from 'enzyme'
import NotFound from './'

describe('renders', () => {
  it('renders NotFound', () => {
    expect(shallow(
        <NotFound />
    )).toMatchSnapshot()
  })
})

