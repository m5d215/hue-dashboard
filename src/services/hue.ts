import axios from 'axios'

export interface Light {
  id: string
  state: {
    on: boolean
    hue: number
    saturation: number
    brightness: number
  }
}

export interface LightPatch {
  id: string
  state: {
    on?: boolean
    hue?: number
    saturation?: number
    brightness?: number
  }
}

type GetLightsResponse = Record<string, GetLightResponse>

interface GetLightResponse {
  state: {
    on: boolean
    hue: number
    sat: number
    bri: number
  }
}

export async function getLights(
  baseURL: string,
  username: string
): Promise<Light[]> {
  const { data } = await axios.get<GetLightsResponse>(
    `/api/${username}/lights`,
    { baseURL }
  )
  return Object.entries(data).map<Light>(([id, light]) => {
    return {
      id,
      state: {
        on: light.state.on,
        hue: light.state.hue,
        saturation: light.state.sat,
        brightness: light.state.bri
      }
    }
  })
}

export async function controlLight(
  baseURL: string,
  username: string,
  light: LightPatch
): Promise<Light> {
  await axios.put(
    `/api/${username}/lights/${light.id}/state`,
    {
      on: light.state.on,
      hue: light.state.hue,
      sat: light.state.saturation,
      bri: light.state.brightness
    },
    { baseURL }
  )
  const { data } = await axios.get<GetLightResponse>(
    `/api/${username}/lights/${light.id}`,
    { baseURL }
  )
  return {
    id: light.id,
    state: {
      on: data.state.on,
      hue: data.state.hue,
      saturation: data.state.sat,
      brightness: data.state.bri
    }
  }
}
