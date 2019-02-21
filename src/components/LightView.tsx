import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Switch, { SwitchProps } from '@material-ui/core/Switch'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Slider, { SliderProps } from '@material-ui/lab/Slider'
import * as cc from 'color-convert'
import deepEqual from 'fast-deep-equal'
import React from 'react'
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

class LightView extends React.Component<Props> {
  public render(): React.ReactNode {
    const { classes, light } = this.props
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
          <Switch checked={light.state.on} onChange={this.changeSwitch} />
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
                  max={65535}
                  min={0}
                  step={1}
                  value={light.state.hue}
                  onChange={this.changeHue}
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
                  max={255}
                  min={0}
                  step={1}
                  value={light.state.saturation}
                  onChange={this.changeSaturation}
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
                  max={255}
                  min={0}
                  step={1}
                  value={light.state.brightness}
                  onChange={this.changeBrightness}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }

  private changeSwitch: SwitchProps['onChange'] = (_, on) => {
    const { light, onChange } = this.props
    onChange({ id: light.id, state: { on } })
  }

  private changeHue: SliderProps['onChange'] = (_, hue) => {
    const { light, onChange } = this.props
    onChange({ id: light.id, state: { hue } })
  }

  private changeSaturation: SliderProps['onChange'] = (_, saturation) => {
    const { light, onChange } = this.props
    onChange({ id: light.id, state: { saturation } })
  }

  private changeBrightness: SliderProps['onChange'] = (_, brightness) => {
    const { light, onChange } = this.props
    onChange({ id: light.id, state: { brightness } })
  }
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
