import React from 'react';
import './PopupMenu.css';

const PopupMenu = ({ items }) => (
  <div className="popup-menu">
    {items.map((item) => (
      <div
        key={item.caption}
        className={`menu-item menu-item-${item.caption}`}
        onClick={item.handler}
      >
        {item.caption}
      </div>
    ))}
  </div>
);

export default PopupMenu;
