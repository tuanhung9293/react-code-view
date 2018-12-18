import React from 'react'
import {shallow} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
import AddMedia from './'

describe('renders', () => {
  it('renders AddMedia', () => {
    expect(shallow(
      <MemoryRouter initialEntries={[{pathname: '/', key: 'testKey'} ]}>
        <AddMedia />
      </MemoryRouter>
    )).toMatchSnapshot()
  })
})
