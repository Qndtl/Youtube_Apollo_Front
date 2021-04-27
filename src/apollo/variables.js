import { makeVar } from '@apollo/client';

export const isloggedInVar = makeVar(Boolean(localStorage.getItem('jwt')));

export const logUserIn = (token) => {
  localStorage.setItem('jwt', token);
  isloggedInVar(true);
}

export const logUserOut = () => {
  localStorage.removeItem('jwt');
  window.location.reload();
}