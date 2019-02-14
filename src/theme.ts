import { createMuiTheme } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import orange from '@material-ui/core/colors/orange'

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: blue,
    secondary: orange
  },
  typography: {
    useNextVariants: true
  }
})
