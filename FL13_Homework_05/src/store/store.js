import { createStore } from 'redux';
import timeLine from './reducer';

const startDevTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(timeLine, startDevTool);
