import axios from 'axios';

const API_HOST = 'http://api.speakspire.com/';

export default axios.create({
  baseURL: API_HOST,
});
