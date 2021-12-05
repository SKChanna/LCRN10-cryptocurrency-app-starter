import {combineReducers} from '@reduxjs/toolkit';
import accounts from './accounts';
import dashboard from './dashboard';

export default combineReducers({
  accounts,
  dashboard
});
