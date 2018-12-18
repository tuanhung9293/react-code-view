import React from 'react'
import {shallow} from 'enzyme'
import ModalHeader from './'

it('renders heading', () => {
  expect(shallow(
    <ModalHeader
      heading="Oh my head"
    />
  )).toMatchSnapshot()
})

it('renders subheading', () => {
  expect(shallow(
    <ModalHeader
      subheading="Oh my neck"
    />
  )).toMatchSnapshot()
})

it('renders with a close button if there is a closeTo param provided', () => {
  expect(shallow(
    <ModalHeader
      heading="I close with a link"
      closeTo="/the/url/to/close/to"
    />
  )).toMatchSnapshot()
})

it('renders with a close button if there is an onClose param provided', () => {
  expect(shallow(
    <ModalHeader
      heading="I close with a function"
      onClose={() => {}}
    />
  )).toMatchSnapshot()
})

it('calls the provided onClose function if the close button is clicked', () => {
  const closeHandler = jest.fn()
  const wrapper = shallow(
    <ModalHeader
      heading="I should react"
      onClose={closeHandler}
    />
  )
  wrapper.find('ClearButton').simulate('click')
  expect(closeHandler).toHaveBeenCalledTimes(1)
})