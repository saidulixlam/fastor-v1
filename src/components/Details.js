import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
const RestaurantDetails = () => {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await axios.get('https://staging.fastor.in/v1/m/restaurant?city_id=118&&', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const { data } = response;
                const matchingRestaurant = data.find(item => item.restaurant_id === id);
                if (matchingRestaurant) {
                    const { restaurant_name, location, images } = matchingRestaurant;
                    const formattedRestaurant = {
                        name: restaurant_name,
                        address: location?.location_address || null,
                        image: images[0].url
                    };
                    setRestaurant(formattedRestaurant);
                }
            } catch (error) {
                console.error('Error fetching restaurant:', error);
            }
        };

        fetchRestaurant();
    }, [id]);

    function btnHandler(){
        navigate("/restaurents");
    }

    return (
        <div className="container mt-4">
            <button className='btn btn-transparent p-1 my-1' onClick={btnHandler}>
            <IoArrowBackCircleOutline size={40}/>
            </button>
            {restaurant && (
                <div className="row">
                    <div className="col-md-6 rounded">
                        <img src={restaurant.image} alt={restaurant.name} className="img-fluid rounded" />
                    </div>
                    <div className="col-md-6">
                        <h2 className='text-center my-4'>{restaurant.name}</h2>
                        <p>Address: {restaurant.address}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantDetails;
