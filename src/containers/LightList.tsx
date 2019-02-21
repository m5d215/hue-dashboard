import { connect } from 'react-redux'
import LightList from '../components/LightList'
import State from '../modules/state'

function mapStateToProps(state: State) {
  const { lights } = state
  return { lights }
}

export default connect(mapStateToProps)(LightList)
