import React from 'react'
import {shallow} from 'enzyme'
import ModalContent from './'

describe('rendering', () => {
  it('renders ModalContent with no props', () => {
    expect(shallow(
      <ModalContent />
    )).toMatchSnapshot()
  })

  it('renders ModalContent with props center', () => {
    expect(shallow(
      <ModalContent center />
    )).toMatchSnapshot()
  })

  it('ModalContent should pass props down', () => {
    expect(shallow(
      <ModalContent data="data" data2="data2" />
    )).toMatchSnapshot()
  })
})