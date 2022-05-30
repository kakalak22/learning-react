import http from './httpServices';
import config from '../config.json';

const apiEndpoint = config.apiUrl + '/movies';

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(id, movie) {
  if (id) return http.put(movieUrl(id), movie);
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
