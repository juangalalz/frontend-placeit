import config from '../../config';

export const getReservations = (initialDate, finaldate) => {
  let headers = {
    "Content-Type": "application/json"
  }
  const requestOptions = {
    method: 'GET',
    headers
  };
  let params = initialDate && finaldate ? `?initial_date=${initialDate}&final_date=${finaldate}` : ''
  return fetch(`${config.apiUrl}/reservations${params}`, requestOptions).then(handleResponse);
}

export const createReservation = ({ identificationCard, fullName, email, phone, movieId }) => {
  let movie = {
    email,
    phone,
    'full_name': fullName,
    'identification_card': identificationCard,
    'movie_id': movieId,
  }
  let headers = {
    "Content-Type": "application/json"
  }
  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(movie)
  };
  return fetch(`${config.apiUrl}/reservations`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = (text && response.ok) && JSON.parse(text);
    if (!response.ok) {
      let errorArray = {
        status: response.status,
        text: (data && data.message) || response.statusText
      }
      const error = errorArray;
      return Promise.reject(error);
    }

    return data;
  });
}
