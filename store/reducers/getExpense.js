const initialState = {
  user : {},
  isLoaded : false
}

export default function(state = initialState, action){
  console.log(action)
  switch (action.type) {
      case 'GET_DATA_REQUEST':
          return {
              ...state,
              signedIn : action.payload
          }
      case 'GET_DATA_DONE':
      return {
          ...state,
          isLoaded : true,
          user : action.payload
      }
      case 'GET_DATA_ERROR':
          return {
              ...state
          }
      default:
          return state;
  }
}