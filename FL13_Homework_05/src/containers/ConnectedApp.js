import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = ({ activePage }) => ({ activePage });

export default connect(mapStateToProps)(App);
