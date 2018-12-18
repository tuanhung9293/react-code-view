import React from 'react'
import {shallow} from 'enzyme'
import PrimaryButton from './'

it('renders as a button with children', () => {
  expect(shallow(
    <PrimaryButton>I am child</PrimaryButton>
  )).toMatchSnapshot()
})

it('overrides className', () => {
  expect(shallow(
    <PrimaryButton className="i-should-not-be-there">I am child</PrimaryButton>
  )).toMatchSnapshot()
})

it('renders as disabled', () => {
  expect(shallow(
    <PrimaryButton disabled>I am child</PrimaryButton>
  )).toMatchSnapshot()
})

it('renders as outlined', () => {
  expect(shallow(
    <PrimaryButton outlined>I am child</PrimaryButton>
  )).toMatchSnapshot()
})

it('renders as outlined danger', () => {
  expect(shallow(
    <PrimaryButton outlined danger>I am child</PrimaryButton>
  )).toMatchSnapshot()
})