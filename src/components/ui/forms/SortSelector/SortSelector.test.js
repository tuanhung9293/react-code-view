import React from 'react'
import {shallow} from 'enzyme'
import SortSelector from './'


describe('renders', () => {
  it('renders SortSelector', () => {
    expect(shallow(
        <SortSelector />
    )).toMatchSnapshot()
  })

  it('SortSelector should pass props down', () => {
    expect(shallow(
        <SortSelector data1="data 1" data2="data 2" />
    )).toMatchSnapshot()
  })
})