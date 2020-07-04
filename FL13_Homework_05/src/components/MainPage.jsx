import React, { useCallback } from 'react';
import TodoList from '../containers/ConnectedTodoList';
import SearchInput from './SearchInput';
import './MainPage.css';

const MainPage = ({ filter, onAddCourse, onFilterChange }) => {
  const handleInputChange = useCallback(({ target: { value } }) => onFilterChange(value), [
    onFilterChange,
  ]);
  return (
    <div className="main-page">
      <div className="main-page-header">
        <SearchInput value={filter} onChange={handleInputChange} placeholder="Search" />
        <input
          type="button"
          className="submit-button button"
          value="Add course"
          onClick={() => onAddCourse()}
        />
      </div>
      <TodoList />
    </div>
  );
};

export default MainPage;
