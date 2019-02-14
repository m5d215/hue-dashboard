import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import RefreshIcon from '@material-ui/icons/Refresh'
import React from 'react'

const styles = (theme: Theme) =>
  createStyles({
    stretch: {
      flexGrow: 1
    },
    icon: {
      marginLeft: theme.spacing.unit
    }
  })

type Props = WithStyles<typeof styles> & {
  onRefresh: () => void
}

function Menu(props: Props): JSX.Element {
  const { classes, onRefresh } = props
  return (
    <AppBar color="primary" position="static">
      <Toolbar variant="dense">
        <Typography
          className={classes.stretch}
          color="inherit"
          variant="subtitle1"
        >
          Philips Hue Dashboard
        </Typography>
        <IconButton
          className={classes.icon}
          color="inherit"
          onClick={onRefresh}
        >
          <RefreshIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(Menu)
