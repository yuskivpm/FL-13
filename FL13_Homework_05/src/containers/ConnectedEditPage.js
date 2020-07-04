import { connect } from 'react-redux';
import EditPage from '../components/EditPage';
import { saveItem, openMainPage } from '../store/actions';

const mapStateToProps = ({ editItem }) => ({ editItem });

const mapDispatchToProps = {
  onSave: saveItem,
  onCancel: openMainPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
