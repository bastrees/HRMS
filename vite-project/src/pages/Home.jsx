import React, { useEffect, useState } from 'react';
import hotelsApi from '../api/hotels';
import HotelCard from '../components/HotelCard';

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        hotelsApi.getHotels()
            .then(response => {
                setHotels(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching hotels:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading hotels: {error.message}</p>;
    }

    if (!Array.isArray(hotels)) {
        return <p>BELLLOOOO</p>;
    }

    return (
        <div className="home-page">
            <h1>Hotel Listings</h1>
            <div className="hotel-list">
                {hotels.map(hotel => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                ))}
            </div>
        </div>
    );
};

export default Home;
