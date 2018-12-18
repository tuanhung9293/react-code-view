import React from 'react'
import {mount, shallow} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import NasaSearch from './'

import configureStore from 'redux-mock-store'
const mockStore = configureStore()

let store = mockStore({
  medias: {
    data: [{}, {}, {}],
    totalHits: 1002,
    params: {
      q: 'dada',
      mediaType: 'video'
    },
    loading: true,
    loadingMore: false
  }
})
store.dispatch = () => {}


describe('renders', () => {
  it('renders NasaSearch conneted', () => {
    expect(shallow(
      <Provider store={store}>
        <NasaSearch />
      </Provider>
    )).toMatchSnapshot()
  })

  it('renders NasaSearch Component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{pathname: '/', key: 'testKey'} ]}>
          <NasaSearch />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.find(NasaSearch)).toMatchSnapshot()
  })
})



