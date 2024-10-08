import { createSlice, nanoid } from '@reduxjs/toolkit';

const domainsInitialState = [
  { id: 'id-1', name: 'NewDomain', fontSize: '18px', fontFamily: "Tahoma", isFontSize: false, isFontFamily: false, },
];

const domainSlice = createSlice({
  name: 'domains',
  initialState: domainsInitialState,
  reducers: {
    addDomain: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({ name, linkUrl, fontSize, fontFamily, colorLink, width, paddingLR, BGColor, botUrl, isBotLink, isFontSize, isFontFamily, isColorLink, isWidth, isPaddingLR, isReplace, isDeleteLift, isLinkUrl, isTrTB, isBGColor, isAddHidden, isLineHeight, LineHeight, urlStart, urlEnd, linkType, typeRT, unsubStart, unsubEnd, typeOfUnsub, }) {
        return {
          payload: {
            name,
            linkUrl,
            fontSize,
            fontFamily,
            colorLink,
            width,
            paddingLR,
            BGColor,
            botUrl,
            isBotLink,
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
            isLineHeight,
            LineHeight,
            urlStart,
            urlEnd,
            linkType,
            typeRT,
            unsubStart,
            unsubEnd,
            typeOfUnsub,
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