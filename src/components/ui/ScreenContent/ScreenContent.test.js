import React from 'react'
import {shallow} from 'enzyme'
import ScreenContent from './'


describe('renders', () => {
  it('renders ScreenContent', () => {
    expect(shallow(
        <ScreenContent />
    )).toMatchSnapshot()
  })

  it('ScreenContent should pass props down', () => {
    expect(shallow(
        <ScreenContent data1="data 1" data2="data 2" />
    )).toMatchSnapshot()
  })
})