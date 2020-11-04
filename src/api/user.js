import jwt_decode from 'jwt-decode';
const SPEAKSPIRE_TOKEN_KEY = 'speakspire-access-token';

export const setToken = (token) => sessionStorage.setItem(SPEAKSPIRE_TOKEN_KEY, token);
export const getToken = () => sessionStorage.getItem(SPEAKSPIRE_TOKEN_KEY);
export const deleteToken = (get) => sessionStorage.removeItem(SPEAKSPIRE_TOKEN_KEY);

export const getUser = () => jwt_decode(getToken());