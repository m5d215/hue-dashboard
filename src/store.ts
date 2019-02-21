import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './modules/reducer'
import saga from './modules/saga'

const sagaMiddleware = createSagaMiddleware()

export default createStore(
  reducer,
  applyMiddleware(createLogger({ diff: true }), sagaMiddleware)
)

sagaMiddleware.run(saga)
