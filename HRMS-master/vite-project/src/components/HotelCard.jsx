import React from 'react';
import './HotelCard.css';

const HotelCard = ({ hotel }) => {
    return (
        <div className="hotel-card">
            {hotel.image && <img src={hotel.image} alt={hotel.name} />}
            <h3>{hotel.name}</h3>
            <p>{hotel.description}</p>
        </div>
    );
};

export default HotelCard;
