import React from 'react'
import {shallow} from 'enzyme'
import Modal from './'

describe('test Modal', () => {
  it('renders Modal with no props', () => {
    expect(shallow(
      <Modal />
    )).toMatchSnapshot()
  })

  it('renders Modal with props notCenter', () => {
    expect(shallow(
      <Modal notCenter />
    )).toMatchSnapshot()
  })

  it('renders Modal with props transparent', () => {
    expect(shallow(
      <Modal transparent />
    )).toMatchSnapshot()
  })
})
