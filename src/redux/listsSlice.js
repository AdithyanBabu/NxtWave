import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching lists
export const fetchLists = createAsyncThunk(
  'lists/fetchLists',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://apis.ccbp.in/list-creation/lists');
      return response.data.lists;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  lists: [],
  selectedLists: [],
  isCreatingNewList: false,
  newList: [],
  backup: null
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    selectList: (state, action) => {
      const listNumber = action.payload;
      const isSelected = state.selectedLists.includes(listNumber);
      
      if (isSelected) {
        state.selectedLists = state.selectedLists.filter(num => num !== listNumber);
      } else {
        state.selectedLists.push(listNumber);
      }
    },
    resetSelection: (state) => {
      state.selectedLists = [];
    },
    createNewList: (state) => {
      state.isCreatingNewList = true;
      state.newList = [];
      state.backup = {
        lists: [...state.lists]
      };
    },
    moveItem: (state, action) => {
      const { itemId, sourceListNumber, targetListNumber } = action.payload;
      
      // Find index of the list in our state array
      const sourceIndex = sourceListNumber === 3 ? -1 : sourceListNumber - 1;
      const targetIndex = targetListNumber === 3 ? -1 : targetListNumber - 1;
      
      // Find the item to move
      let itemToMove;
      
      if (sourceListNumber === 3) {
        // Item is in the new list
        const itemIndex = state.newList.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          itemToMove = { ...state.newList[itemIndex] };
          state.newList = state.newList.filter(item => item.id !== itemId);
        }
      } else {
        // Item is in one of the original lists
        const sourceItems = state.lists[sourceIndex];
        const itemIndex = sourceItems.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          itemToMove = { ...sourceItems[itemIndex] };
          state.lists[sourceIndex] = sourceItems.filter(item => item.id !== itemId);
        }
      }
      
      // Add the item to the target list
      if (itemToMove) {
        if (targetListNumber === 3) {
          // Add to new list
          state.newList.push(itemToMove);
        } else {
          // Add to one of the original lists
          state.lists[targetIndex].push(itemToMove);
        }
      }
    },
    cancelNewList: (state) => {
      state.isCreatingNewList = false;
      state.newList = [];
      if (state.backup) {
        state.lists = state.backup.lists;
      }
      state.backup = null;
      state.selectedLists = [];
    },
    updateLists: (state) => {
      state.isCreatingNewList = false;
      state.backup = null;
      state.selectedLists = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false;
        // Group items by list_number
        const list1 = action.payload.filter(item => item.list_number === 1);
        const list2 = action.payload.filter(item => item.list_number === 2);
        state.lists = [list1, list2];
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  selectList, 
  resetSelection, 
  createNewList, 
  moveItem, 
  cancelNewList, 
  updateLists 
} = listsSlice.actions;

export default listsSlice.reducer;