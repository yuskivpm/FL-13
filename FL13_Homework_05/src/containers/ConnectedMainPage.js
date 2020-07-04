import { connect } from 'react-redux';
import MainPage from '../components/MainPage';
import { openEditor, filterChange } from '../store/actions';

const mapStateToProps = ({ filter }) => ({ filter });

const mapDispatchToProps = {
  onAddCourse: openEditor,
  onFilterChange: filterChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
