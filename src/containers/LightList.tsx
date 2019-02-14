import { connect } from 'react-redux'
import LightList from 'src/components/LightList'
import State from 'src/modules/state'

function mapStateToProps(state: State) {
  const { lights } = state
  return { lights }
}

export default connect(mapStateToProps)(LightList)
