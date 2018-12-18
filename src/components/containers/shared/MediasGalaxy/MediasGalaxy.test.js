import React from 'react'
import {mount, shallow} from 'enzyme'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router-dom'
import MediasGalaxy from './'

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
  },
  ui: {windowSize: {width: 615, height: 953}}
})
store.dispatch = () => {}

function createMockComponent() {
  return jest.fn().mockImplementation(props => null)
}

describe('renders', () => {
  it('renders MediasGalaxy connected', () => {
    expect(shallow(
      <Provider store={store}>
        <MediasGalaxy
          galaxyData={[]}
          source="medias"
          actionComponent={createMockComponent()}
          total={100}
        />
      </Provider>
    )).toMatchSnapshot()
  })

  it('renders MediasGalaxy Component empty element', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MediasGalaxy
          galaxyData={[]}
          source="medias"
          actionComponent={createMockComponent()}
          total={0}
        />
      </Provider>
    )
    expect(wrapper.find(MediasGalaxy)).toMatchSnapshot()
  })

  it('renders MediasGalaxy Component filled elements', () => {
    jest.mock('../../../ui/NasaMediaItem', () => ()=> <div id="mockNasaMediaItem">
      NasaMediaItem
    </div>)

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{pathname: '/', key: 'testKey'} ]}>
          <MediasGalaxy
            galaxyData={[{}, {}, {}]}
            source="collection"
            actionComponent={createMockComponent()}
            total={3}
          />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.find(MediasGalaxy)).toMatchSnapshot()
  })
})

