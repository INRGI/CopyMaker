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
      prepare({name, fontSize, fontFamily, colorLink, width, paddingLR, BGColor, isFontSize, isFontFamily, isColorLink, isWidth, isPaddingLR, isReplace, isDeleteLift, isLinkUrl, isTrTB, isBGColor,isAddHidden}) {
        return {
          payload: {
            name,
            fontSize,
            fontFamily,
            colorLink,
            width,
            paddingLR,
            BGColor,
            isFontSize,
            isFontFamily,
            isColorLink,
            isWidth,
            isPaddingLR,
            isReplace,
            isDeleteLift,
            isLinkUrl,
            isTrTB,
            isBGColor,
            isAddHidden,
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
          return state.map((domain, idx) => {
              if (idx === index) {
                  return {
                      ...domain,
                      ...action.payload.values
                  };
              }
              return domain;
          });
      }
      return state;
  },
    
  },
});

export const { addDomain, deleteDomain, editDomain } = domainSlice.actions;
export const domainReducer = domainSlice.reducer;