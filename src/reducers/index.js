import { combineReducers } from 'redux';

import gartens from './gartens';
import auth from './auth';
import sections from './sections';
import organisations from './organisations';
import workers from './worker';
import lessons from './lesson';

export const reducers = combineReducers({ gartens, auth, sections, organisations, workers, lessons });
