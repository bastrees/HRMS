import axios from 'axios';

const API_URL = '/api/auth/';

const login = (username, password) => {
    return axios.post(`${API_URL}login`, { username, password });
};

const register = (username, password, role) => {
    return axios.post(`${API_URL}register`, { username, password, role });
};

export default {
    login,
    register
};
