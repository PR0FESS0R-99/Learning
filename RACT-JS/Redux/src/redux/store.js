import { createStore } from 'redux';
import { rootReducer } from './rootReduer';

const store = createStore(rootReducer)

export default store