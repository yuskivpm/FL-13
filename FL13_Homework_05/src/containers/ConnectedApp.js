import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = state => {
  const { activePage } = state;
  return { activePage };
};

export default connect(mapStateToProps)(App);
