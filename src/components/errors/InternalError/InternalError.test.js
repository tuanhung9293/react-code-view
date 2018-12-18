import React from 'react'
import {shallow} from 'enzyme'
import InternalError from './'

describe('renders', () => {
  it('renders InternalError', () => {
    expect(shallow(
        <InternalError />
    )).toMatchSnapshot()
  })
})

