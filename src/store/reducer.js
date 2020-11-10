import * as actionTypes from './actions/actions'
import axios from 'axios'

const initialState = {
  data: null,
  isLoading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_START:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.FETCH_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case actionTypes.SAVE_DATA:
      return {
        data: action.forecastData,
        isLoading: false,
      }

    default:
      return state
  }
}

export default reducer
