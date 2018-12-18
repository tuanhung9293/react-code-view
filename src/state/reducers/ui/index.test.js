import ui from './'
import {UPDATE_WINDOW_SIZE} from 'constants/actionTypes'

describe('window size', () => {
  it('sets initial state', () => {
    expect(ui(undefined, {})).toMatchSnapshot()
  })

  it('updates window size', () => {
    expect(ui(undefined, {type: UPDATE_WINDOW_SIZE, payload: {
      width: 666,
      height: 666
    }})).toMatchSnapshot()
  })

  it('calculates new windowSize when undefined state is provided', () => {
    ui(undefined, {})
    window.innerHeight = 10000
    window.innerWidth = 10000
    expect(ui(undefined, {})).toMatchSnapshot()
  })
})
