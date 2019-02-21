import Grid from '@material-ui/core/Grid'
import deepEqual from 'fast-deep-equal'
import React from 'react'
import LightView from '../containers/LightView'
import { Light } from '../services/hue'

interface Props {
  lights: Light[]
}

function LightList(props: Props): JSX.Element {
  const { lights } = props
  return (
    <Grid container={true} spacing={8}>
      {lights.map(light => (
        <Grid key={light.id} item={true} xs={12} sm={6} md={4} lg={3} xl={2}>
          <LightView light={light} />
        </Grid>
      ))}
    </Grid>
  )
}

export default React.memo(LightList, deepEqual)
