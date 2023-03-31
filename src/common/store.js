import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import facilityReducer from '../booking/reducer';
import dashboardReducer from '../dashboard/reducer';
import profileReducer from '../profile/reducer';
import supeUserReducer from '../superuser/reducer';
import authReducer from './auth/reducer';
import myBookingReducer from '../mybooking/reducer';
import bookingManagementReducer from '../admin/bookingManagement/reducer';
import rootSaga from './saga';

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    superuser: supeUserReducer,
    auth: authReducer,
    profile: profileReducer,
    facility: facilityReducer,
    myBooking: myBookingReducer,
    bookingManagement: bookingManagementReducer,
});

const sagaMiddleware = createSagaMiddleware();

const enhancers = applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancers);

export default store;

sagaMiddleware.run(rootSaga);
