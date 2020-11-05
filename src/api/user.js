import jwt_decode from 'jwt-decode';
const SPEAKSPIRE_TOKEN_KEY = 'speakspire-access-token';
const SPEAKSPIRE_ID = 'speakspire-id';
const SPEAKSPIRE_ROLE = 'speakspire-role';

export const setToken = (token) => sessionStorage.setItem(SPEAKSPIRE_TOKEN_KEY, token);
export const getToken = () => sessionStorage.getItem(SPEAKSPIRE_TOKEN_KEY);
export const deleteToken = (get) => sessionStorage.removeItem(SPEAKSPIRE_TOKEN_KEY);

export const saveID = (id) => sessionStorage.setItem(SPEAKSPIRE_ID, id);
export const getID = () => sessionStorage.getItem(SPEAKSPIRE_ID);

export const saveRole = (role) => sessionStorage.setItem(SPEAKSPIRE_ROLE, role);
export const getRole = () => sessionStorage.getItem(SPEAKSPIRE_ROLE);

export const getUser = () => jwt_decode(getToken());
