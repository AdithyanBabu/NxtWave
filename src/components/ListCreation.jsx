import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchLists, 
  createNewList, 
  cancelNewList, 
  updateLists 
} from '../redux/listsSlice';
import Loader from './Loader';
import FailureView from './ErrorView';
import ListContainer from './ListContainer';

const ListCreation = () => {
  const dispatch = useDispatch();
  const { 
    loading, 
    error, 
    lists, 
    selectedLists, 
    isCreatingNewList, 
    newList 
  } = useSelector(state => state.lists);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const handleCreateNewList = () => {
    if (selectedLists.length !== 2) {
      setErrorMessage('You should select exactly 2 lists to create a new list');
      return;
    }

    setErrorMessage('');
    dispatch(createNewList());
  };

  const handleCancelNewList = () => {
    dispatch(cancelNewList());
  };

  const handleUpdateLists = () => {
    dispatch(updateLists());
  };

  const handleRetry = () => {
    dispatch(fetchLists());
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <FailureView onRetry={handleRetry} />;
  }

  return (
    <div className="list-creation-container">
      
      {!isCreatingNewList ? (
        <>
        <h1 className="list-creation-heading">List Creation</h1>
          <button 
            className="create-list-button"
            onClick={handleCreateNewList}
          >
            Create a new list
          </button>
          
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
          
          <div className="lists-container">
            {lists.map((listItems, index) => (
              <ListContainer 
                key={index + 1}
                listNumber={index + 1}
                items={listItems}
                selectedLists={selectedLists}
                isCreatingNewList={isCreatingNewList}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="list-creation-view">
            <div className="lists-creation-container">
              <ListContainer 
                listNumber={1}
                items={lists[0]}
                selectedLists={selectedLists}
                isCreatingNewList={isCreatingNewList}
              />
              
              <ListContainer 
                listNumber={3}
                items={newList}
                selectedLists={selectedLists}
                isCreatingNewList={isCreatingNewList}
              />
              
              <ListContainer 
                listNumber={2}
                items={lists[1]}
                selectedLists={selectedLists}
                isCreatingNewList={isCreatingNewList}
              />
            </div>
            
            <div className="list-creation-actions">
              <button 
                className="cancel-button"
                onClick={handleCancelNewList}
              >
                Cancel
              </button>
              <button 
                className="update-button"
                onClick={handleUpdateLists}
              >
                Update
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListCreation;