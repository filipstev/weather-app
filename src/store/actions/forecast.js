import * as actionTypes from './actions'
import axios from 'axios'

export const saveData = (res) => {
  return {
    type: actionTypes.SAVE_DATA,
    forecastData: res,
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_DATA_FAIL,
    error: error,
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_DATA_START,
  }
}

export const storeData = (address) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart())
    axios
      .get('/weather/' + address)
      .then((res) => {
        dispatch(saveData(res))
      })
      .catch((err) => dispatch(fetchOrdersFail(err)))
  }
}
