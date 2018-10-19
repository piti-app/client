import { combineReducers } from 'redux'
import Authentication from './Authentication'
import getExpense from './getExpense'

export default combineReducers({
    Authentication: Authentication,
    getExpense : getExpense
})