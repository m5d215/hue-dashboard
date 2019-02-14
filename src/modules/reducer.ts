import { controlLight, getLights } from 'src/modules/actions'
import State from 'src/modules/state'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

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
