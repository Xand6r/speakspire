import axios from 'axios';

// const API_HOST = 'http://api.speakspire.com/';
const API_HOST = 'http://localhost:8000/';

export default axios.create({
  baseURL: API_HOST,
});
