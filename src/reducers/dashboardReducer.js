// import {
//   VALIDATION_FAILURE,
//   VALIDATION_SUCCESS,
//   EMAIL_EXISTS
// } from '../actions/actions';


const initialState = {
  someState: true
}


const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // case VALIDATION_SUCCESS:
    //     return {
    //         ...state,
    //         [action.field + 'State']: "success",
    //         [action.field]: action.value
    //     }
    default:
      return state;
  }
}

export default dashboardReducer;