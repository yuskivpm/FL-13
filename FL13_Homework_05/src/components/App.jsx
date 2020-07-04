import React from 'react';
import MainPage from '../containers/ConnectedMainPage';
import EditPage from '../containers/ConnectedEditPage';
import { EDIT_PAGE } from '../utils/constants';
import './App.css';

function App(props) {
  const { activePage } = props;
  return (
    <div className="App">
      <header className="app-header">Learn React!</header>
      {activePage === EDIT_PAGE ? <EditPage /> : <MainPage />}
    </div>
  );
}

export default App;
