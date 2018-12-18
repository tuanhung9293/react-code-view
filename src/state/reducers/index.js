import {combineReducers} from 'redux'
import collections from './collections'
import medias from './medias'
import forms from './forms'
import ui from './ui'

const root = combineReducers({
  collections,
  medias,
  forms,
  ui
})

function rootReducer(state, action) {
  return root(state, action)
}

export default rootReducer