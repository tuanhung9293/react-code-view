import {UPDATE_WINDOW_SIZE} from 'constants/actionTypes'

function ui(state = {
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight
  }
}, action) {
  switch (action.type) {
    case UPDATE_WINDOW_SIZE:
      return {
        ...state,
        windowSize: {
          ...state.windowSize,
          ...action.payload
        }
      }
    default:
      return state
  }
}

export default ui