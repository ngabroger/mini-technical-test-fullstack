export const USER_URL = 'http://localhost:3000/api/users/verify';
export const API_URL = 'http://localhost:3000/api/todos';
export function getUserId() {
  return localStorage.getItem('userId') || '';
}