import { createSelector } from "@reduxjs/toolkit";

export const getDomains = state => state.domains;

export const selectFilter = (state) => state.filters.inputValue;

export const selectVisibleDomains = createSelector(
    [getDomains, selectFilter],
    (domains, filters) => {
      return domains.filter(domain =>
        domain.name.toLowerCase().includes(filters.toLowerCase())
      );
    }
  );
