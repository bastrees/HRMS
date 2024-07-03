import axios from 'axios';

const API_URL = '/api/hotels/';

const getHotels = () => {
    return axios.get(API_URL);
};

const addHotel = (name, description, image) => {
    return axios.post(API_URL, { name, description, image });
};

const updateHotel = (id, name, description, image) => {
    return axios.put(`${API_URL}${id}`, { name, description, image });
};

const deleteHotel = (id) => {
    return axios.delete(`${API_URL}${id}`);
};

export default {
    getHotels,
    addHotel,
    updateHotel,
    deleteHotel
};
