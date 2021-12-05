import {createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';

const slice = createSlice({
  name: 'dashboard',
  initialState: {
    listOfGeneralAccounts: [],
    cashLedger: [],
    cashOpeningBalance: 0,
    cashBalance: 0,
    loading: false,
    selected: null,
  },
  reducers: {
    setLoading: (state, action) => {
      const loading = action.payload;
      if (typeof loading === 'boolean') state.loading = loading;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setGeneralAccounts: (state, action) => {
      state.listOfGeneralAccounts = action.payload;
      state.loading = false;
    },
    setCashLedger: (state, action) => {
      state.cashLedger = action.payload.ledger;
      state.cashOpeningBalance = action.payload.openingBalance;
      state.cashBalance = action.payload.currentBalance;
      state.loading = false;
    }
  },
});

export const {setGeneralAccounts, setCashLedger, setSelected, setLoading} = slice.actions;
export default slice.reducer;

export const selected = createSelector(
  (state) => state.entities.dashboard.selected,
  (selected) => selected,
);
export const generalAccounts = createSelector(
  (state) => state.entities.dashboard.listOfGeneralAccounts,
  (listOfGeneralAccounts) => listOfGeneralAccounts,
);
export const cashLedger = createSelector(
  (state) => state.entities.dashboard.cashLedger,
  (cashLedger) => cashLedger,
);
export const cashOpeningBalance = createSelector(
  (state) => state.entities.dashboard.cashOpeningBalance,
  (cashOpeningBalance) => cashOpeningBalance,
);
export const cashBalance = createSelector(
  (state) => state.entities.dashboard.cashBalance,
  (cashBalance) => cashBalance,
);
export const loading = createSelector(
  (state) => state.entities.dashboard.loading,
  (loading) => loading,
);
