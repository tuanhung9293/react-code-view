import debounce from 'lodash/debounce'
import {START_TRACKING_WINDOW, STOP_TRACKING_WINDOW} from 'constants/actionTypes'

import {updateWindowSize} from 'state/actions/uiAction'

let resizeListener = null

function handleResize(dispatch) {
  return debounce((e) => {
    window.requestAnimationFrame(() => {
      dispatch(updateWindowSize({width: window.innerWidth, height: window.innerHeight}))
    })
  }, 100)
}

const trackWindowMiddleware = ({dispatch}) => next => action => {
  if (action.type === START_TRACKING_WINDOW) {
    if (resizeListener === null) {
      resizeListener = handleResize(dispatch)
      window.addEventListener('resize', resizeListener)
    }
  }
  if (action.type === STOP_TRACKING_WINDOW) {
    window.removeEventListener('resize', resizeListener)
    resizeListener = null
  }
  next(action)
}

export default trackWindowMiddleware