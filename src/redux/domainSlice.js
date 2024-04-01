import { createSlice, nanoid } from '@reduxjs/toolkit';

const domainsInitialState = [
  { id: 'id-1', name: 'NewDomain', fontSize: '18px', fontFamily: "Tahoma",isFontSize:false,isFontFamily:false, },
];

const domainSlice = createSlice({
  name: 'domains',
  initialState: domainsInitialState,
  reducers: {
    addDomain: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({name, fontSize, fontFamily, isFontSize, isFontFamily}) {
        return {
          payload: {
            name,
            fontSize,
            fontFamily,
            isFontSize,
            isFontFamily,
            id: nanoid()
          },
        };
      },
    },
    deleteDomain(state, action) {
      const index = state.findIndex((domain) => domain.id === action.payload);
      state.splice(index, 1);
    },
    editDomain(state, action) {
      const index = state.findIndex(
        (domain) => domain.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload.values
        };
      }
    },
    
  },
});

export const { addDomain, deleteDomain, editDomain } = domainSlice.actions;
export const domainReducer = domainSlice.reducer;