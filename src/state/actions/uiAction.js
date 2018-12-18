
import {START_TRACKING_WINDOW, STOP_TRACKING_WINDOW, UPDATE_WINDOW_SIZE} from 'constants/actionTypes'

export function startTrackingWindow() {
  return {
    type: START_TRACKING_WINDOW
  }
}

export function stopTrackingWindow() {
  return {
    type: STOP_TRACKING_WINDOW
  }
}

export function updateWindowSize({width, height}) {
  return {
    type: UPDATE_WINDOW_SIZE,
    payload: {
      width,
      height
    }
  }
}