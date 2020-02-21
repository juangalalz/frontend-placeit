import {
  GET_RESERVATIONS_REQUEST,
  GET_RESERVATIONS_SUCCESS,
  GET_RESERVATIONS_FAILURE,
  CREATE_RESERVATION_REQUEST,
  CREATE_RESERVATION_SUCCESS,
  CREATE_RESERVATION_FAILURE,
} from '../action-types'

const initialState = {
  reservations: [],
  error: false,
  loading: false,
  loadingCreate: false,
  reservation: {}
}

const reservations = (state = initialState, action) => {
  switch (action.type) {

    case GET_RESERVATIONS_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_RESERVATIONS_SUCCESS: {
      let reservations = action.data.data
      return {
        ...state,
        reservations,
        error: false,
        loading: false
      }
    }

    case GET_RESERVATIONS_FAILURE: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }

    case CREATE_RESERVATION_REQUEST: {
      return {
        ...state,
        loadingCreate: true
      }
    }

    case CREATE_RESERVATION_SUCCESS: {
      let reservation = action.data
      return {
        ...state,
        reservation,
        error: false,
        loadingCreate: false
      }
    }

    case CREATE_RESERVATION_FAILURE: {
      return {
        ...state,
        error: action.error,
        loadingCreate: false
      }
    }

    default:
      return state
  }
}

export default reservations
