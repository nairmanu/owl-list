import * as React from "react";

interface DraggableProps {
  className: string;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
}

const Draggable: React.FC<DraggableProps> = ({ className, onDragStart, onDragEnter, onDragEnd, children }) => {
  return (
    <div draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      className={className}>
      {children}
    </div>
  )
}

export default Draggable;