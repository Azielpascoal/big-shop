import { combineReducers } from 'redux';
import { app } from './app';
import { products } from './products';
import { checkout } from './checkout';
import { auth } from '../../Core/onboarding/redux/auth';

// combine reducers to build the state
const appReducer = combineReducers({
  auth,
  app,
  products,
  checkout,
});

export default appReducer;
