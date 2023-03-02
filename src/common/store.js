import { createStore, combineReducers } from 'redux';
import dashboardReducer from '../dashboard/reducer';

const rootReducer = combineReducers({
    dashboard: dashboardReducer
})

const store = createStore(rootReducer);

export default store;
