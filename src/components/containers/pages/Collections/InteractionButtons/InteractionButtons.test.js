import React from 'react'
import {mount, shallow} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import InteractionButtons from './'

import configureStore from 'redux-mock-store'
const mockStore = configureStore()

let store = mockStore({
  medias: {
    collections: {
      data: [{}, {}, {}]
    }
  }
})
store.dispatch = () => {}


describe('renders', () => {
  it('renders InteractionButtons connected', () => {
    expect(shallow(
      <Provider store={store}>
        <InteractionButtons />
      </Provider>
    )).toMatchSnapshot()
  })

  it('renders InteractionButtons Component', () => {
    jest.mock('../../../../ui/buttons/Button', () => ()=> <div id="mockButton">
      Button
    </div>)

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{pathname: '/', key: 'testKey'} ]}>
          <InteractionButtons
            itemData={{liked: true, nasaId: 123}}
            likedCollection={() => {}}
            deleteCollection={() => {}}
          />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.find(InteractionButtons)).toMatchSnapshot()
  })
})

