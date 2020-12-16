import * as React from "react";
import "./ItemForm.css";

interface ItemFormProps {
  onGenerateClick: (count: number) => void;
  onResetClick: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onGenerateClick, onResetClick }) => {
  const [numberOfItems, setNumberOfItems] = React.useState<string>("");

  const handleNumberOfItemsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfItems(event.target.value);
  };

  const onReset = () => {
    setNumberOfItems("");
    onResetClick();
  };

  return (
    <div className="item-form-container">
      <input name="numberOfItems" placeholder="# of items" value={numberOfItems} className="form-input" onChange={handleNumberOfItemsChange} />
      <button onClick={() => onGenerateClick(Number(numberOfItems))} className="form-buttons">Generate</button>
      <button onClick={onReset} className="form-buttons">Reset</button>
    </div>
  );
}

export default ItemForm;
