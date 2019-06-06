import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {reducer as formReducer} from 'redux-form';
import auth from './auth';

const reducer = combineReducers({
    auth,
    form: formReducer
})

const middleware = applyMiddleware(thunkMiddleware, createLogger())

const store = createStore(reducer, middleware)

export default store
export * from './auth'