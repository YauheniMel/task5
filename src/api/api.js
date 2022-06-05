import axios from 'axios';

const requestAPI = {
  login(name) {
    return axios.put('/api/login', { name }).then((response) => response.data);
  },
};

export default requestAPI;
