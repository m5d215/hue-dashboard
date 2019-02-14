import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import React from 'react'
import LightList from 'src/containers/LightList'
import Menu from 'src/containers/Menu'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: theme.palette.background.default
    },
    content: {
      margin: theme.spacing.unit
    }
  })

type Props = WithStyles<typeof styles>

function App(props: Props): JSX.Element {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Menu />
      <div className={classes.content}>
        <LightList />
      </div>
    </div>
  )
}

export default withStyles(styles)(App)
