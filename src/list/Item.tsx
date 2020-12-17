import * as React from "react";
import Draggable from "../utils/drag-drop/Draggable";

import "./Item.scss";

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
    <Draggable
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      className={`item-container${isAlt ? " alternate" : ""}`}>
      <div className="item-text">{text}</div>
      <button className="item-delete-button" onClick={() => onDeleteClick(index)}>Delete</button>
    </Draggable>
  );
};

export default Item;