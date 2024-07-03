import axios from 'axios';

const API_URL = '/api/hotels/';

const getHotels = () => {
    return axios.get(API_URL);
};

export default {
    getHotels
};
