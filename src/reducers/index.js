import { combineReducers } from 'redux';

import gartens from './gartens';
import auth from './auth';

export const reducers = combineReducers({ gartens, auth });
