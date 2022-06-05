import axios from 'axios';

const requestAPI = {
  login(name) {
    return axios.put('/api/login', { name }).then((response) => response.data);
  },
  sendMessage(data) {
    return axios.post('/api/send', data).then((response) => response.data);
  },
};

export default requestAPI;
