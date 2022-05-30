import jwtDecode from 'jwt-decode';
import config from '../config.json';
import http from './httpServices';

const apiEndpoint = config.apiUrl + '/auth';
const tokenKey = 'token';

export async function login(email, password) {
  const response = await http.post(apiEndpoint, { email, password });
  const jwt = response.data;
  localStorage.setItem(tokenKey, jwt);
}

export function registerLogin(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  registerLogin,
  getUser,
  logout
};
