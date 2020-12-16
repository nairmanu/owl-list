import * as React from "react";

import "./Item.css";

interface ItemProps {
  text: string;
  isAlt: boolean;
  index: number;
  onDeleteClick: (index: number) => void;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
}

const Item: React.FC<ItemProps> = ({ text, isAlt, index, onDeleteClick, onDragStart, onDragEnter, onDragEnd }) => {
  return (
    <div draggable
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      className={`item-container${isAlt ? " alternate" : ""}`}>
      <div className="item-text">{text}</div>
      <button className="item-delete-button" onClick={() => onDeleteClick(index)}>Delete</button>
    </div>
  );
};

export default Item;