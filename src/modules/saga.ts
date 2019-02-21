import { SagaIterator } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { parse } from 'url'
import * as hue from '../services/hue'
import { controlLight, getLights } from './actions'
import { delay, takeLatestFSA } from './saga-helper'
import State from './state'

const query = parse(location.href, true).query
const server = `${query.server || 'http://127.0.0.1'}`
const username = `${query.username || ''}`
const throttle = parseInt(`${query.throttle || 300}`, 10)

export default function* saga(): SagaIterator {
  yield takeLatestFSA(getLights.started, handleGetLights)
  yield takeLatestFSA(controlLight.started, handleControlLight)
}

function* handleGetLights(
  _: ReturnType<typeof getLights.started>
): SagaIterator {
  try {
    const result: hue.Light[] = yield call(hue.getLights, server, username)
    yield put(getLights.done({ result }))
  } catch (error) {
    yield put(getLights.failed({ error }))
  }
}

function* handleControlLight(
  action: ReturnType<typeof controlLight.started>
): SagaIterator {
  const { payload: params } = action

  const { lights }: State = yield select()
  const light = lights.find(({ id }) => id === params.id)
  if (light === undefined) {
    const error = new Error()
    yield put(controlLight.failed({ params, error }))
    return
  }

  const uncommited = {
    ...light,
    state: { ...light.state, ...params.state }
  }
  yield put(controlLight.done({ params, result: uncommited }))

  yield delay(throttle)

  try {
    const result: hue.Light = yield call(
      hue.controlLight,
      server,
      username,
      params
    )
    yield put(controlLight.done({ params, result }))
  } catch (error) {
    yield put(controlLight.failed({ params, error }))
  }
}
