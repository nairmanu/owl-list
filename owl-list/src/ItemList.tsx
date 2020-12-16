import * as React from "react";
import Item from "./Item";

import "./ItemList.css";

interface ItemListProps {
  items: string[];
  onDeleteClick: (index: number) => void;
  swapItems: (fromIndex: number, toIndex: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDeleteClick, swapItems }) => {

  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [showScrollToBottomButton, setShowScrollToBottomButton] = React.useState<boolean>(false);
  const [fromIndex, setFromIndex] = React.useState<number>(0);
  const [toIndex, setToIndex] = React.useState<number>(0);

  React.useEffect(() => {
    scrollToBottom();
  }, [items.length, bottomRef]);

  const scrollToBottom = () => {
    if (bottomRef !== null && bottomRef.current !== null) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const observer = React.useRef(new IntersectionObserver(entries => {
    const entry = entries[0];

    if (entry.isIntersecting) {
      setShowScrollToBottomButton(false);
    } else {
      setShowScrollToBottomButton(true);
    }
  }, { threshold: 1 }));

  React.useEffect(() => {
    const currentObserver = observer.current;
    const currentRef = bottomRef.current;
    if (currentRef) currentObserver.observe(currentRef);

    return () => {
      if (currentRef) currentObserver.unobserve(currentRef);
    };
  }, []);



  const onDragEnd = () => {
    swapItems(fromIndex, toIndex);
  };

  const onDragStart = (index: number) => {
    setFromIndex(index);
  };

  const onDragEnter = (index: number) => {
    setToIndex(index);
  };

  return (
    <div className="item-list-container">
      <div className="item-list-content">
        {items.map((item, index) => {
          return <Item
            key={index}
            text={item}
            isAlt={index % 2 === 0}
            index={index}
            onDeleteClick={onDeleteClick}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter} />
        })}
        <div ref={bottomRef}></div>
      </div>
      {showScrollToBottomButton && <button className="scroll-bottom-button" onClick={scrollToBottom}>Scroll to bottom</button>}
    </div>
  )
};

export default ItemList;