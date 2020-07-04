import { createStore } from 'redux';
import timeLine from './reducer';

export default createStore(timeLine, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
