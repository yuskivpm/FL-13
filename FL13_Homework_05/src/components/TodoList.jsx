import React, { useState, useMemo, useEffect } from 'react';
import TodoItem from './TodoItem';
import PopupMenu from './PopupMenu';
import './TodoList.css';

const getFilteredIndexes = (rows, filterText) => {
  if (!filterText) {
    return new Array(rows.length).fill(0).map((v, i) => i);
  }
  const lowerCaseFilter = filterText.toLowerCase();
  return rows.reduce((indexes, item, index) => {
    if (item.title.toLowerCase().includes(lowerCaseFilter)) {
      indexes.push(index);
    }
    return indexes;
  }, []);
};

const TodoList = (props) => {
  const [activeItemId, setActiveItem] = useState(null);
  useEffect(() => {
    if (activeItemId) {
      window.addEventListener('click', setActiveItem);
      return () => window.removeEventListener('click', setActiveItem);
    }
  }, [activeItemId]);

  const { rows = [], filter, todoItemDataOrder, onEditItem, onDeleteItem } = props;

  const filteredIndexes = useMemo(() => getFilteredIndexes(rows, filter), [rows, filter]);
  if (!filteredIndexes.length) {
    return <p>No matches found</p>;
  }

  const POPUP_MENU_ITEMS = [
    { caption: 'Edit', handler: () => onEditItem(activeItemId) },
    { caption: 'Delete', handler: () => onDeleteItem(activeItemId) },
  ];

  const handleOpenPopupMenu = (event, id) => {
    event.stopPropagation();
    setActiveItem(id);
  };

  return (
    <ul className="todo-list">
      {filteredIndexes.map((index) => (
        <TodoItem
          key={rows[index].id}
          item={rows[index]}
          order={todoItemDataOrder}
          onActivate={setActiveItem}
        >
          <span className="item-button-wrapper">
            <span
              className="item-button"
              tabIndex="0"
              role="button"
              onClick={(event) => handleOpenPopupMenu(event, rows[index].id)}
            >
              ...
            </span>
            {activeItemId === rows[index].id ? <PopupMenu items={POPUP_MENU_ITEMS} /> : null}
          </span>
        </TodoItem>
      ))}
    </ul>
  );
};

export default TodoList;
