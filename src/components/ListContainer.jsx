import React from "react";
import { useDispatch } from "react-redux";
import { selectList } from "../redux/listsSlice";
import ListItem from "./ListItem";

const ListContainer = ({
  listNumber,
  items,
  selectedLists,
  isCreatingNewList,
}) => {
  const dispatch = useDispatch();

  const handleSelectList = () => {
    if (!isCreatingNewList) {
      dispatch(selectList(listNumber));
    }
  };

  const isSelected = selectedLists.includes(listNumber);

  return (
    <div className={`list-container ${isSelected ? "selected" : ""}`}>
      {!isCreatingNewList && listNumber !== 3 && (
        <div className="list-header">
          <input
            type="checkbox"
            id={`list-${listNumber}`}
            checked={isSelected}
            onChange={handleSelectList}
            className="list-checkbox"
          />
          <label htmlFor={`list-${listNumber}`} className="list-label">
            List {listNumber}
          </label>
        </div>
      )}


      
      {isCreatingNewList && listNumber <=3 && (
        <div className="list-header">
          <h3 className="new-list-label">
            List {listNumber}
            {" "}
            ({items.length})
          </h3>
        </div>
      )}

      <div className="list-items">
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            listNumber={listNumber}
            isCreatingNewList={isCreatingNewList}
          />
        ))}
        {items.length === 0 && (
          <div className="empty-list-message">This list is empty</div>
        )}
      </div>
    </div>
  );
};

export default ListContainer;
