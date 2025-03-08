import React from 'react';
import { useDispatch } from 'react-redux';
import { moveItem } from '../redux/listsSlice';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ListItem = ({ item, listNumber, isCreatingNewList }) => {
  const dispatch = useDispatch();

  const handleMoveToNewList = () => {
    dispatch(moveItem({ itemId: item.id, sourceListNumber: listNumber, targetListNumber: 3 }));
  };

  const handleMoveToFirstList = () => {
    dispatch(moveItem({ itemId: item.id, sourceListNumber: listNumber, targetListNumber: 1 }));
  };

  const handleMoveToSecondList = () => {
    dispatch(moveItem({ itemId: item.id, sourceListNumber: listNumber, targetListNumber: 2 }));
  };

  const renderMoveButtons = () => {
    if (!isCreatingNewList) return null;

    if (listNumber === 1) {
      return (
        <button 
          className="move-button right" 
          onClick={handleMoveToNewList}
          aria-label="Move to new list"
        >
          <ArrowRight size={20} />
        </button>
      );
    } else if (listNumber === 2) {
      return (
        <button 
          className="move-button left" 
          onClick={handleMoveToNewList}
          aria-label="Move to new list"
        >
          <ArrowLeft size={20} />
        </button>
      );
    } else if (listNumber === 3) {
      // This is for new list items
      return (
        <div className="new-list-buttons">
          <button 
            className="move-button left" 
            onClick={handleMoveToFirstList}
            aria-label="Move to first list"
          >
            <ArrowLeft size={20} />
          </button>
          
          <button 
            className="move-button right" 
            onClick={handleMoveToSecondList}
            aria-label="Move to second list"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="list-item">
      <div className="list-item-content">
        <h3 className="list-item-name">{item.name}</h3>
        <p className="list-item-description">{item.description}</p>
      </div>
      {renderMoveButtons()}
    </div>
  );
};

export default ListItem;