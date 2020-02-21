import * as movieService from '../services';
import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  CREATE_MOVIES_REQUEST,
  CREATE_MOVIES_SUCCESS,
  CREATE_MOVIES_FAILURE,
} from '../action-types'

export const getMovies = (initialDate, finaldate) => {
  return dispatch => {
    dispatch(request());
    movieService.getMovies(initialDate, finaldate)
    .then(
      data => {
        dispatch(success(data));
      },
      error => {
        dispatch(failure(error));
      }
    );
  }

  function request() { return { type: GET_MOVIES_REQUEST } }
  function success(data) { return { type: GET_MOVIES_SUCCESS, data } }
  function failure(error) { return { type: GET_MOVIES_FAILURE, error } }
}

export const createMovie = ({name, description, imageUrl, startDate, finalDate}) => {
  return dispatch => {
    dispatch(request());
    movieService.createMovie({name, description, imageUrl, startDate, finalDate})
    .then(
      data => {
        dispatch(success(data));
        dispatch(getMovies())
      },
      error => {
        dispatch(failure(error));
      }
    );
  }

  function request() { return { type: CREATE_MOVIES_REQUEST } }
  function success(data) { return { type: CREATE_MOVIES_SUCCESS, data } }
  function failure(error) { return { type: CREATE_MOVIES_FAILURE, error } }
}
