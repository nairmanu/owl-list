import React from 'react';
import ItemForm from "./form/ItemForm";
import ItemList from "./list/ItemList";

import './App.scss';

function App() {

  const fromLocalStorage = localStorage.getItem("owlList");

  const [items, setItems] = React.useState<string[]>(fromLocalStorage ? JSON.parse(fromLocalStorage) : []);


  const onGenerate = (count: number) => {
    const fullText = `Lorem ipsum dolor sit amet, audiam nostrud temporibus vel ut, cu brute soleat referrentur eam. 
    An consul iriure cum. In ius everti tacimates, dico percipit interpretaris et sit. Ex sea appetere corrumpit, 
    ex mel summo definitionem, graeco putant oblique cu mea. Et his facete dicunt rationibus, eos at brute inimicus 
    consectetuer. Te tation labores sensibus eos. Pro eu assum ubique. Et viderer laoreet dissentiunt has, ullum 
    incorrupte dissentiunt ex mei, ea brute tempor est. Ad eam ornatus constituam, cum iudico consul ea, libris corpora 
    scribentur vim eu. Veniam tacimates referrentur vel ex, assum zril ex nam, id quo vitae partem mucius. No corrumpit 
    necessitatibus quo, sea te mazim fastidii constituam. Sed in mundi malorum consectetuer, velit aliquam legimus at 
    mei. Deseruisse reformidans ex vel, harum paulo mel in, ad omnium epicuri vix. Aperiam similique voluptaria mel at, 
    cum an aperiam ponderum splendide. Ei tale similique moderatius has. Amet salutatus id has, denique aliquando te eum, 
    purto dissentiunt sit cu. Te eirmod minimum sed, at has quodsi commune. Populo accusam ea vis, ea per libris vituperatoribus, 
    facete partiendo temporibus has te. Vel essent commodo intellegam in, id vel populo labores expetendis.`;
    const max = fullText.length;

    let newElements: string[] = [];
    for (let i = 0; i < count; i++) {
      const newText = fullText.substring(Math.floor(Math.random() * Math.floor(max)), Math.floor(Math.random() * Math.floor(max)));
      newElements.push(newText);
    }

    persistItems([...items, ...newElements]);
  };

  const onResetClick = () => {
    persistItems([]);
  }

  const reorderItem = (fromIndex: number, toIndex: number) => {
    const reOrderedList = Array.from(items);

    const [item] = reOrderedList.splice(fromIndex, 1);
    reOrderedList.splice(toIndex, 0, item);

    persistItems(reOrderedList);
  };

  const onDeleteClick = (index: number) => {
    persistItems(items.filter((_item, i) => i !== index));
  };

  const persistItems = (newItems: string[]) => {
    localStorage.setItem("owlList", JSON.stringify(newItems));
    setItems(newItems);
  };

  return (
    <div className="App">
      <ItemForm onGenerateClick={onGenerate} onResetClick={onResetClick} />
      <ItemList items={items} onDeleteClick={onDeleteClick} reorderItem={reorderItem} />
    </div>
  );
}

export default App;
