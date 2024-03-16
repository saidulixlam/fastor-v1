import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate(); 
    const [phoneNumberInput, setPhoneNumberInput] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
                navigate(`/otp?phone=${phoneNumberInput}`);
            }, 3000); 
            return () => clearTimeout(timer);
        }
    }, [show, phoneNumberInput, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `https://staging.fastor.in/v1/pwa/user/register/`,
                {
                    phone: "981897945", 
                    dial_code: "+91"  
                }
            );
            if (response.data.status === "Success") {
                setShow(true);
            } else {
                setError(response.data.error_message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to send verification code. Please try again.');
        }
    };

    return (
        <div style={{minHeight:'100vh'}} className="container d-flex justify-content-center align-items-center">
            <div  className="col-sm-12 col-md-6 col-lg-4">
            {show && <div className="alert alert-success text-center mb-0" role="alert">
                OTP sent successfully
            </div>}
            <h2 className='my-1 p-1'>Enter Your Mobile Number</h2>
            <span className='text-center text-muted mx-1 p-1'>We will send you the OTP verification code</span>
            <form onSubmit={handleSubmit} className="w-100xmx-1">
                <div className="form-group my-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Phone Number"
                        value={phoneNumberInput}
                        onChange={(e) => setPhoneNumberInput(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-danger btn-block w-100">
                    Send Code
                </button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
            </div>
        </div>
    );
};

export default Signup;
