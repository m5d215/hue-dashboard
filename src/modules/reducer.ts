import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { controlLight, getLights } from './actions'
import State from './state'

const initialState: State = {
  lights: []
}

export default reducerWithInitialState(initialState)
  .case(getLights.done, (state, { result: lights }) => ({
    ...state,
    lights
  }))
  .case(getLights.failed, state => ({
    ...state,
    lights: []
  }))
  .case(controlLight.done, (state, { result }) => ({
    ...state,
    lights: state.lights.map(light => (light.id === result.id ? result : light))
  }))
