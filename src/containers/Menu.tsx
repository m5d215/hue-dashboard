import { connect } from 'react-redux'
import Menu from 'src/components/Menu'
import { getLights } from 'src/modules/actions'

export default connect(
  null,
  { onRefresh: getLights.started }
)(Menu)
