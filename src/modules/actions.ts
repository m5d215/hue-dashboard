import { Light, LightPatch } from 'src/services/hue'
import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const getLights = actionCreator.async<void, Light[], Error>('GET_LIGHTS')

export const controlLight = actionCreator.async<LightPatch, Light, Error>(
  'CONTROL_LIGHT'
)
