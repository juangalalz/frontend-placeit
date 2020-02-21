import * as reservationService from '../services';

import {
  GET_RESERVATIONS_REQUEST,
  GET_RESERVATIONS_SUCCESS,
  GET_RESERVATIONS_FAILURE,
  CREATE_RESERVATION_REQUEST,
  CREATE_RESERVATION_SUCCESS,
  CREATE_RESERVATION_FAILURE,
} from '../action-types'

export const getReservations = (initialDate, finaldate) => {
  return dispatch => {
    dispatch(request());
    reservationService.getReservations(initialDate, finaldate)
    .then(
      data => {
        dispatch(success(data));
      },
      error => {
        dispatch(failure(error));
      }
    );
  }

  function request() { return { type: GET_RESERVATIONS_REQUEST } }
  function success(data) { return { type: GET_RESERVATIONS_SUCCESS, data } }
  function failure(error) { return { type: GET_RESERVATIONS_FAILURE, error } }
}

export const createReservation = ({ identificationCard, fullName, email, phone, movieId }) => {
  return dispatch => {
    dispatch(request());
    reservationService.createReservation({ identificationCard, fullName, email, phone, movieId })
    .then(
      data => {
        dispatch(success(data));
      },
      error => {
        dispatch(failure(error));
      }
    );
  }

  function request() { return { type: CREATE_RESERVATION_REQUEST } }
  function success(data) { return { type: CREATE_RESERVATION_SUCCESS, data } }
  function failure(error) { return { type: CREATE_RESERVATION_FAILURE, error } }
}
