import { combineReducers } from 'redux'
import Authentication from './Authentication'
import getExpense from './getExpense'
import getRecommendations from './getRecommendations'

export default combineReducers({
    Authentication: Authentication,
    getExpense : getExpense,
    getRecommendations : getRecommendations
})