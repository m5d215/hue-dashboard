import { connect } from 'react-redux'
import Menu from '../components/Menu'
import { getLights } from '../modules/actions'

export default connect(
  null,
  { onRefresh: getLights.started }
)(Menu)
