import React from 'react'
import {shallow} from 'enzyme'
import {Provider} from 'react-redux'
import Collections from './'

import configureStore from 'redux-mock-store'
const mockStore = configureStore()

let store = mockStore({
  collections: {
    data: [{}, {}, {}]
  }
})
store.dispatch = () => {}

describe('renders', () => {
  it('renders Collections', () => {
    expect(shallow(
      <Provider store={store}>
        <Collections />
      </Provider>
    )).toMatchSnapshot()
  })
})

