import { actionCreatorFactory } from 'typescript-fsa'
import { Light, LightPatch } from '../services/hue'

const actionCreator = actionCreatorFactory()

export const getLights = actionCreator.async<void, Light[], Error>('GET_LIGHTS')

export const controlLight = actionCreator.async<LightPatch, Light, Error>(
  'CONTROL_LIGHT'
)
