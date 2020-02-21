import config from '../../config';

export const getMovies = (initialDate, finaldate) => {
  let headers = {
    "Content-Type": "application/json"
  }
  const requestOptions = {
    method: 'GET',
    headers
  };
  let params = initialDate && finaldate ? `?initial_date=${initialDate}&final_date=${finaldate}` : ''
  return fetch(`${config.apiUrl}/movies${params}`, requestOptions).then(handleResponse);
}

export const createMovie = ({name, description, imageUrl, startDate, finalDate}) => {
  let movie = {
    name,
    description,
    'image_url': imageUrl,
    'start_date': startDate,
    'final_date': finalDate,
  }
  let headers = {
    "Content-Type": "application/json"
  }
  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(movie)
  };
  return fetch(`${config.apiUrl}/movies`, requestOptions).then(handleResponse);
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
