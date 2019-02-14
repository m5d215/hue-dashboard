import { MuiThemeProvider } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from 'src/App'
import { getLights } from 'src/modules/actions'
import store from 'src/store'
import theme from 'src/theme'

store.dispatch(getLights.started())

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
