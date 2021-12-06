import {createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';

const slice = createSlice({
  name: 'accounts',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
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
    setList: (state, action) => {
      let {list, update} = action.payload;
      if (update) {
        list = state.list.concat(list);
        state.list = list;
      }
      state.list = list;
      state.loading = false;
      state.lastFetch = Date.now();
    },
  },
});

export const {setList, setSelected, setLoading} = slice.actions;
export default slice.reducer;

export const selected = createSelector(
  (state) => state.entities.accounts.selected,
  (selected) => selected,
);
export const list = createSelector(
  (state) => state.entities.accounts.list,
  (list) => list,
);
export const listForDropDown = createSelector(
  (state) => state.entities.accounts.list,
  (list) => list.map((a) => ({ account: a, name: `${a.accountName}` })),
);
export const loading = createSelector(
  (state) => state.entities.accounts.loading,
  (loading) => loading,
);
