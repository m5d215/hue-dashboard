import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/lab/Slider'
import * as cc from 'color-convert'
import deepEqual from 'fast-deep-equal'
import React, { useCallback, useRef } from 'react'
import { Light, LightPatch } from '../services/hue'

const styles = (theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing.unit
    },
    name: {
      marginLeft: theme.spacing.unit,
      flexGrow: 1
    },
    color: {
      width: '100%',
      height: 16
    },
    columnContent: {
      minWidth: 100
    }
  })

type Props = WithStyles<typeof styles> & {
  light: Light
  onChange: (light: LightPatch) => void
}

function LightView(props: Props): JSX.Element {
  const { classes, light, onChange } = props

  const id = useRef(light.id)

  const changeSwitch = useCallback(
    (_: React.ChangeEvent<{}>, on) => {
      onChange({ id: id.current, state: { on } })
    },
    [id, onChange]
  )

  const changeHue = useCallback(
    (_: React.ChangeEvent<{}>, hue: number) => {
      onChange({ id: id.current, state: { hue } })
    },
    [id, onChange]
  )

  const changeSaturation = useCallback(
    (_: React.ChangeEvent<{}>, saturation: number) => {
      onChange({ id: id.current, state: { saturation } })
    },
    [id, onChange]
  )

  const changeBrightness = useCallback(
    (_: React.ChangeEvent<{}>, brightness: number) => {
      onChange({ id: id.current, state: { brightness } })
    },
    [id, onChange]
  )

  return (
    <Paper square={true}>
      <div
        className={classes.color}
        style={{ background: toRGBString(light.state) }}
      />

      <Grid className={classes.content} container={true} alignItems="center">
        <Typography className={classes.name} color="default" variant="h6">
          #{light.id}
        </Typography>
        <Switch checked={light.state.on} onChange={changeSwitch} />
      </Grid>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell variant="head">
              <Typography color="inherit" variant="body1">
                Hue
              </Typography>
            </TableCell>
            <TableCell>
              <Slider
                className={classes.columnContent}
                disabled={!light.state.on}
                max={65535}
                min={0}
                step={1}
                value={light.state.hue}
                onChange={changeHue}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">
              <Typography color="inherit" variant="body1">
                Saturation
              </Typography>
            </TableCell>
            <TableCell>
              <Slider
                className={classes.columnContent}
                disabled={!light.state.on}
                max={255}
                min={0}
                step={1}
                value={light.state.saturation}
                onChange={changeSaturation}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">
              <Typography color="inherit" variant="body1">
                Brightness
              </Typography>
            </TableCell>
            <TableCell>
              <Slider
                className={classes.columnContent}
                disabled={!light.state.on}
                max={255}
                min={0}
                step={1}
                value={light.state.brightness}
                onChange={changeBrightness}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(React.memo(LightView, deepEqual))

function toRGBString(hsv: Light['state']): string {
  const { hue, saturation, brightness } = hsv
  const h = Math.round((hue / 65535) * 360)
  const s = Math.round((saturation / 255) * 100)
  const v = Math.round((brightness / 255) * 100)
  const rgb = cc.hsv.rgb([h, s, v])
  return `#${cc.rgb.hex(rgb)}`
}
