const initialState = {
  recommendations : [],
  isLoaded : false,
  latitude : 0,
  longitude : 0
}

export default function(state = initialState, action){
  console.log(action)
  switch (action.type) {
      case 'GET_RECOMMENDATIONS_REQUEST':
          return {
              ...state,
              isLoaded : false
          }
      case 'GET_RECOMMENDATIONS_DONE':
      return {
          ...state,
          recommendations : action.payload.recommendations,
          isLoaded : true,
          latitude : action.payload.latitude,
          longitude : action.payload.longitude
      }
      case 'GET_RECOMMENDATIONS_ERROR':
          return {
              ...state
          }
      default:
          return state;
  }
}