import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from 'src/modules/reducer'
import saga from 'src/modules/saga'

const sagaMiddleware = createSagaMiddleware()

export default createStore(
  reducer,
  applyMiddleware(createLogger({ diff: true }), sagaMiddleware)
)

sagaMiddleware.run(saga)
