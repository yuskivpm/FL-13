import React from 'react';

const TodoItem = ({ item, order = [], children }) => (
  <li className="todo-item">
    {order.map((keyName) => (
      <span className={`item-cell item-${keyName}`} key={keyName}>
        {item[keyName]}
      </span>
    ))}
    {children}
  </li>
);

export default TodoItem;
