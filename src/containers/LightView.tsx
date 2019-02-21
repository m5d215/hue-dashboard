import { connect } from 'react-redux'
import LightView from '../components/LightView'
import { controlLight } from '../modules/actions'

export default connect(
  null,
  { onChange: controlLight.started }
)(LightView)
