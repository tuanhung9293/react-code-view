import React from 'react'
import {shallow} from 'enzyme'
import {Column} from './'

it('renders children', () => {
  expect(shallow(
    <Column>
      <p>I feel like a child</p>
    </Column>
  )).toMatchSnapshot()
})

it('creates a grid column when it takes a span parameter from 1 to 12', () => {
  for (let i = 1; i <= 12; i++) {
    expect(shallow(
      <Column span={i}>
        <p>I feel like a child</p>
      </Column>
    )).toMatchSnapshot()
  }
})

it('takes breakpoint to alter column span according to screen width', () => {
  expect(shallow(
    <Column span="6" breakPoints={[{maxWidth: 600, span: 12}]} windowWidth={500} />
  )).toMatchSnapshot()
})

it('hides element if span is 0', () => {
  expect(shallow(<Column span="0" />)).toMatchSnapshot()
  expect(shallow(
    <Column span="6" breakPoints={[{maxWidth: 600, span: 0}]} windowWidth={500} />
)).toMatchSnapshot()
})