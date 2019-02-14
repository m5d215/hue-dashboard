import { connect } from 'react-redux'
import LightView from 'src/components/LightView'
import { controlLight } from 'src/modules/actions'

export default connect(
  null,
  { onChange: controlLight.started }
)(LightView)
