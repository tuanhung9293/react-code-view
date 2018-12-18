import 'babel-polyfill'
import 'raf/polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'
import Root from 'components/roots/Root'
import {store, persistor} from 'state/store'

const root = document.getElementById('root')

render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>
), root)
