import React from 'react';

const TodoItem = (props) => {
  const { item, order = [], children } = props;
  return (
    <li className="todo-item">
      {order.map((keyName) => (
        <span className={`item-cell item-${keyName}`} key={keyName}>
          {item[keyName]}
        </span>
      ))}
      {children}
    </li>
  );
};

export default TodoItem;
