import React from 'react'
import {mount, shallow} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import CollectionHeader from './'

import configureStore from 'redux-mock-store'
const mockStore = configureStore()

let store = mockStore({
  medias: {
    params: {
      q: 'data',
      mediaType: 'audio'
    }
  },
  ui: {windowSize: {width: 615, height: 953}}
})
store.dispatch = () => {}


describe('renders', () => {
  it('renders CollectionHeader', () => {
    expect(shallow(
      <Provider store={store}>
        <CollectionHeader />
      </Provider>
    )).toMatchSnapshot()
  })

  it('renders CollectionHeader Component', () => {
    jest.mock('../../../../ui/buttons/PrimaryButton', () => ()=> <div id="mockPrimaryButton">
      PrimaryButton
    </div>)

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{pathname: '/', key: 'testKey'} ]}>
          <CollectionHeader />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.find(CollectionHeader)).toMatchSnapshot()
  })
})

