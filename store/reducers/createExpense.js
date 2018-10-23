var initialState = {
    dataExpense: [],
    isLoading: false,
    isNotif: false
  }
  
  const dataExpense = (state = initialState, action) => {
    switch(action.type) {
      case 'CREATE_EXPENSE':
        state.dataExpense = action.payload.dataExpense
        return {...state,isLoading: true, isNotif: true}
      case 'DELETE_EXPENSE':
        state.dataExpense = action.payload.dataExpense
        return {...state,isLoading: true, isNotif: true}
      case 'EDIT_EXPENSE':
        state.dataExpense = action.payload.dataExpense
        return {...state,isLoading: true, isNotif: true}
      default:
        return state
    }
  }
  
  export default dataExpense