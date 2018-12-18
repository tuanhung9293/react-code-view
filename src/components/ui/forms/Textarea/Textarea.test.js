import React from 'react'
import {shallow} from 'enzyme'
import Textarea from './'


describe('renders', () => {
  it('renders Textarea', () => {
    expect(shallow(
        <Textarea />
    )).toMatchSnapshot()
  })

  it('renders Textarea with props hasError', () => {
    expect(shallow(
        <Textarea hasError />
    )).toMatchSnapshot()
  })
})
