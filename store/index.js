import {applyMiddleware, createStore} from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './reducers'

let initState = { }
const middleware = [ReduxThunk]
const store = createStore(rootReducer,initState,applyMiddleware(...middleware))

export default store