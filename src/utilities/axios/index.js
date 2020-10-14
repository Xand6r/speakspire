import axios from 'axios';

const API_HOST = 'http://api.speakspire.com/individuals/add';

export default axios.create({
  baseURL: API_HOST,
});
