import React from 'react'
import {shallow} from 'enzyme'
import SearchForm from './'

describe('renders', () => {
  it('renders SearchForm', () => {
    expect(shallow(
      <SearchForm />
    )).toMatchSnapshot()
  })
})

