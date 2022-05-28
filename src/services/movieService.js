import http from './httpServices';
import config from '../config.json';

export function getMovies() {
  return http.get(config.movieApiEndpoint);
}

export function getMovie(id) {
  console.log(config.movieApiEndpoint + '/' + id);
  return http.get(config.movieApiEndpoint + '/' + id);
}

export function saveMovie(id, movie) {
  if (id) return http.put(config.movieApiEndpoint + '/' + id, movie);
  return http.post(config.movieApiEndpoint, movie);
}

export function deleteMovie(id) {
  return http.delete(config.movieApiEndpoint + '/' + id);
}
