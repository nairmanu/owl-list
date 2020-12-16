import * as React from "react";
import { useVirtual } from "react-virtual";
import Item from "./Item";

import "./ItemList.css";

interface ItemListProps {
  items: string[];
  onDeleteClick: (index: number) => void;
  swapItems: (fromIndex: number, toIndex: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDeleteClick, swapItems }) => {

  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [fromIndex, setFromIndex] = React.useState<number>(0);
  const [toIndex, setToIndex] = React.useState<number>(0);

  const VirtualizedItems = () => {
    const [showScrollToBottomButton, setShowScrollToBottomButton] = React.useState<boolean>(false);
    const parentRef = React.useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtual({
      size: items.length,
      parentRef,
      overscan: 5,
    });

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

    // Ignore react-hooks/exhaustive-deps lint warning. we cannot add rowVirtualizer in to dependency array
    // as it will result in infinite re-renders (unable to perform object comparison)
    React.useEffect(() => {
      // setTimeout to ensure scroll to bottom happens after all the items are rendered in case of large numbers
      setTimeout(() => rowVirtualizer.scrollToIndex(items.length - 1, { align: 'start' }), 0);
    }, [items.length]);

    const onDragEnd = () => {
      swapItems(fromIndex, toIndex);
      // Once this PR (https://github.com/tannerlinsley/react-virtual/pull/55/files), we can recalculate the
      // height of rows after they are reordered.
    };

    const onDragStart = (index: number) => {
      setFromIndex(index);
    };

    const onDragEnter = (index: number) => {
      setToIndex(index);
    };

    return (
      <div
        ref={parentRef}
        className="item-list-content">
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: "100%",
            position: "relative"
          }}
        >
          {rowVirtualizer.virtualItems.map(virtualRow => (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureRef}
              className="item"
              style={{
                height: `${items[virtualRow.index]}px`,
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              <Item
                key={virtualRow.index}
                text={items[virtualRow.index]}
                isAlt={virtualRow.index % 2 === 0}
                index={virtualRow.index}
                onDeleteClick={onDeleteClick}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
                onDragEnter={onDragEnter} />
            </div>
          ))}
          <div ref={bottomRef} className="bottom-ref-div"></div>
        </div>
        {showScrollToBottomButton && <button className="scroll-bottom-button" onClick={() => rowVirtualizer.scrollToIndex(items.length - 1)}>Scroll to bottom</button>}
      </div>
    );
  }

  return (
    <div className="item-list-container">
      {VirtualizedItems()}
    </div>
  )
};

export default ItemList;