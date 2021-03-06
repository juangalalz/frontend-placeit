import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  CREATE_MOVIES_REQUEST,
  CREATE_MOVIES_SUCCESS,
  CREATE_MOVIES_FAILURE,
} from '../action-types'

const initialState = {
  movies: [],
  error: false,
  loading: false,
  loadingCreate: false,
  movie: {}
}

const movies = (state = initialState, action) => {
  switch (action.type) {

    case GET_MOVIES_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_MOVIES_SUCCESS: {
      let movies = action.data.data
      return {
        ...state,
        movies,
        error: false,
        loading: false
      }
    }

    case GET_MOVIES_FAILURE: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }

    case CREATE_MOVIES_REQUEST: {
      return {
        ...state,
        loadingCreate: true
      }
    }

    case CREATE_MOVIES_SUCCESS: {
      let movie = action.data
      return {
        ...state,
        movie,
        error: false,
        loadingCreate: false
      }
    }

    case CREATE_MOVIES_FAILURE: {
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

export default movies
