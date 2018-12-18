import React from 'react'
import {shallow} from 'enzyme'
import DocumentTitle from './'

describe('rendering', () => {
  it('renders DocumentTitle with props title', () => {
    expect(shallow(
      <DocumentTitle title="test title" />
    )).toMatchSnapshot()
  })
})