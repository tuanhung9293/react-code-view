import {
  startTrackingWindow,
  stopTrackingWindow,
  updateWindowSize
} from './uiAction'
import {createBaseStore} from 'state/store'

it('creates an action to startTrackingWindow', () => {
  expect(startTrackingWindow()).toMatchSnapshot()
})

it('creates an action to stopTrackingWindow', () => {
  expect(stopTrackingWindow()).toMatchSnapshot()
})

describe('integration', () => {
  it('updateWindowSize', () => {
    const store = createBaseStore({
      ui: {
        windowSize: {
          width: 666,
          height: 666
        }
      }
    })
    store.dispatch(updateWindowSize({width: 778, height: 877}))
    expect(store.getState().ui).toMatchSnapshot()
  })
})