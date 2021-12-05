import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';

function configureRedux() {
  return configureStore({reducer});
}
export default configureRedux;
