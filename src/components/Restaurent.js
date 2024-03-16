import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrupal } from '@fortawesome/free-brands-svg-icons';
import { BiSolidOffer } from "react-icons/bi";
import { IoWalletOutline } from "react-icons/io5";

const Restaurant = ({ name, address, image }) => {
    return (
        <div className="card mb-5 shadow-sm mx-2 my-2 d-flex flex-column align-center" style={{
            height: '90%',
            borderRadius: '14px',
            overflow: 'hidden',
            maxWidth: '300px',
            '@media (minWidth: 768px)': {
                height: '100%'
            }
        }}>
            <img src={image} alt="Restaurant pic" style={{
                objectFit: "cover",
                width: "100%",
                height: '150px',
                borderTopLeftRadius: '14px',
                borderTopRightRadius: '14px'
            }} />

            <div className="card-body bg-white bg-opacity-75 p-2 my-3" style={{ maxHeight: '30%', overflow: 'hidden' }}>
                <h6 className="card-title">{name}</h6>
                <span className="card-text">Address: {address}</span>
            </div>
        </div>

    );
};

const Popular = ({ name, ratings, image }) => {
    return (
        <div className=" p-2 card mb-4 border-0 shadow-md my-2 d-flex flex-row align-items-center" style={{borderRadius: '14px', height: '40%', listStyle: 'none' }}>
            <img src={image} alt="Restaurant" style={{ objectFit: "cover", width: "50%", height: '165px', borderRadius: '14px' }} />
            <div className="bg-white bg-opacity-75 mx-5 mb-3" style={{ width: '50%', height: "140px" }}>
                <h6 className="card-title">{name}</h6>
                <p className="card-text text-muted p-0">Cakes,Pastry,Pastas</p>
                <span className="text-muted">Cannaught Place ,New Delhi</span>
                <p className="">Ratings: {ratings} <span className='mt-5'>*</span></p>

            </div>
        </div>
    );
};


const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(
                    'https://staging.fastor.in/v1/m/restaurant?city_id=118&&',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                const { data } = response;
                const restaurantsList = data.map(({ restaurant_id, restaurant_name, location, images, rating }) => ({

                    restaurant_id,
                    restaurant_name,
                    rating: rating.restaurant_avg_rating,
                    location: location,
                    image: images[0].url,
                }));

                setRestaurants(restaurantsList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-2 mt-5' style={{ minHeight: '100vh' }}>

            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-lg">
                <div className="container mx-2">

                    <div className="d-flex flex-column">

                        <div className="d-flex align-items-center">
                            <span>Pre Order From</span>
                            
                        </div>

                        <h3 className="mb-0">Order from New Delhi</h3>
                    </div>

                    <div className="ml-auto mr-1">
                        <FontAwesomeIcon icon={faDrupal} style={{ color: '#FFD43B', fontSize: '2em' }} />
                    </div>
                </div>
            </nav>


            {/* User information section */}
            <div className="container mt-5 d-flex justify-content-between align-items-center bg-light shadow p-2 rounded ml-2">
                <div className='d-flex flex-column bg-light shadow-sm p-1 rounded'>
                    <h3 className='text-muted'>John</h3>
                    <p>Let's explore this evening....</p>
                </div>
                <div className='d-flex justify-around align-center'>
                    <span><IoWalletOutline size={40} /></span>
                    <span><BiSolidOffer size={40} /></span>
                </div>
            </div>

            {/* User Taste section */}
            <div className="p-1 mt-4 mx-1">
                <div className='d-flex justify-content-between align-center'>
                    <h3 className='p-2'>
                        Your Taste
                    </h3>
                    <button className='btn btn-transparent '>
                        <span>View All {'>'}</span>
                    </button>
                </div>

                {/* swipable section */}
                <SwipeableViews axis='x'>
                    <div className="d-flex flex-nowrap" style={{ height: '260px' }}>
                        {restaurants.map((restaurant, index) => (
                            <div key={index} className="col-5 gap-2 mb-2" >
                                <Link to={`/detail/${restaurant.restaurant_id}`} style={{ textDecoration: 'none' }}>
                                    <Restaurant
                                        image={restaurant.image}
                                        name={restaurant.restaurant_name}
                                        address={restaurant.location?.location_address || null}
                                        rating={restaurant.restaurant_mode}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </SwipeableViews>
            </div>
            <div className="mx-1 mt-3 p-2">
                <h3 className=' mx-2'>Popular ones</h3>
                {restaurants.map((restaurant, index) => (
                    <div key={index}>
                        <Link to={`/detail/${restaurant.restaurant_id}`} style={{ textDecoration: 'none' }}>
                            <Popular
                                image={restaurant.image}
                                name={restaurant.restaurant_name}
                                address={restaurant.location?.location_address || null}
                                ratings={restaurant.rating}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantList;
