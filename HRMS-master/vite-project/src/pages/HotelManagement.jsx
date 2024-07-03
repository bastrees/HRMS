import React, { useEffect, useState } from 'react';
import hotelsApi from '../api/hotels';
import axios from 'axios';
import './HotelManagement.css';

const HotelManagement = () => {
    const [hotels, setHotels] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [editId, setEditId] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const response = await hotelsApi.getHotels();
            setHotels(response.data);
        } catch (err) {
            console.error('Error fetching hotels:', err);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.filePath;
        } catch (err) {
            console.error('Error uploading file:', err);
        }
    };

    const handleAddHotel = async () => {
        const uploadedImage = await handleUpload();
        try {
            await hotelsApi.addHotel(name, description, uploadedImage);
            setName('');
            setDescription('');
            setImage('');
            setFile(null);
            fetchHotels();
        } catch (err) {
            console.error('Error adding hotel:', err);
        }
    };

    const handleUpdateHotel = async () => {
        const uploadedImage = await handleUpload();
        try {
            await hotelsApi.updateHotel(editId, name, description, uploadedImage);
            setEditId(null);
            setName('');
            setDescription('');
            setImage('');
            setFile(null);
            fetchHotels();
        } catch (err) {
            console.error('Error updating hotel:', err);
        }
    };

    const handleDeleteHotel = async (id) => {
        try {
            await hotelsApi.deleteHotel(id);
            fetchHotels();
        } catch (err) {
            console.error('Error deleting hotel:', err);
        }
    };

    const handleEditClick = (hotel) => {
        setEditId(hotel._id);
        setName(hotel.name);
        setDescription(hotel.description);
        setImage(hotel.image);
    };

    return (
        <div className="hotel-management">
            <h1>Hotel Management</h1>
            <div className="hotel-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                />
                {editId ? (
                    <button onClick={handleUpdateHotel}>Update Hotel</button>
                ) : (
                    <button onClick={handleAddHotel}>Add Hotel</button>
                )}
            </div>
            <div className="hotel-list">
                {hotels.map((hotel) => (
                    <div key={hotel._id} className="hotel-card">
                        <h2>{hotel.name}</h2>
                        <p>{hotel.description}</p>
                        {hotel.image && <img src={hotel.image} alt={hotel.name} />}
                        <button onClick={() => handleEditClick(hotel)}>Edit</button>
                        <button onClick={() => handleDeleteHotel(hotel._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelManagement;
