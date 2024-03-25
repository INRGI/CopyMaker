import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = { inputValue: '' };

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setDomainsFilter(state, action) {
      state.inputValue = action.payload;
    },
  },
});

export const { setDomainsFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;