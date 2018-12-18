import React from 'react'
import {shallow} from 'enzyme'
import TypeSelector from './'


describe('renders', () => {
  it('renders TypeSelector', () => {
    expect(shallow(
        <TypeSelector />
    )).toMatchSnapshot()
  })

  it('TypeSelector should pass props down', () => {
    expect(shallow(
        <TypeSelector data1="data 1" data2="data 2" />
    )).toMatchSnapshot()
  })
})