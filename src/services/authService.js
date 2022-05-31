import jwtDecode from 'jwt-decode';
import http from './httpServices';

const apiEndpoint = '/auth';
const tokenKey = 'token';

http.setJwt(getJwt());

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

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  registerLogin,
  getUser,
  logout,
  getJwt
};
