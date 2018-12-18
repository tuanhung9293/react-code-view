import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import trackWindowMiddleware from 'state/middleware/trackWindowMiddleware'
import rootReducer from '../reducers'
import {startTrackingWindow} from '../actions/uiAction'

const middlewares = [
  thunk,
  trackWindowMiddleware
]

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['collections']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const isDev = process.env.NODE_ENV === 'development'

const composeEnhancers =
  (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export function createBaseStore(initialState = {}) {
  return createStore(
    persistedReducer,
    {
      ...initialState
    },
    composeEnhancers(applyMiddleware(...middlewares))
  )
}

const store = createBaseStore()
store.dispatch(startTrackingWindow())

const persistor = persistStore(store)

export {store, persistor}
