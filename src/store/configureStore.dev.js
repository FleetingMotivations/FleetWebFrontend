import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

/** 
    configureStore allows us to apply changes and middleware to 
    the redux store before it is used. 
    Helps us apply persisted state, loggers for state change and
    hot reloading for app code changes
    
**/
const configureStore = preloadedState => {

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore