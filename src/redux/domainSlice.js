import { createSlice, nanoid } from '@reduxjs/toolkit';

const domainsInitialState = [
  { id: 'id-1', name: 'NewDomain', fontSize: '18px', fontFamily: "Tahoma" },
];

const domainSlice = createSlice({
  name: 'domains',
  initialState: domainsInitialState,
  reducers: {
    addDomain: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({name, fontSize, fontFamily}) {
        return {
          payload: {
            name,
            fontSize,
            fontFamily,
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
      const index = state.findIndex((domain) => domain.id === action.payload);
      state.domains.splice(index, 1);
    },
  },
});

export const { addDomain, deleteDomain, editDomain } = domainSlice.actions;
export const domainReducer = domainSlice.reducer;