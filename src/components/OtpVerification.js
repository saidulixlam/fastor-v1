import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const OtpVerification = () => {
    const [otpInput, setOtpInput] = useState('');
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                navigate('/restaurents');
                setShow(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [show, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://staging.fastor.in/v1/pwa/user/login/`,
            {
                phone: "981897945", // Your phone number
                otp: "123456",   // Your dialing code
                dial_code: "+91"
            }
            );
            const dataa= response.data;
            const token = dataa.data.token;
            localStorage.setItem('token',token);
           if(response.status === 200){
            setShow(true);
            // navigate(`/otp?phone=${phoneNumberInput}`);
           }
            
        } catch (error) {
            console.error('Error:', error);
            
        }
    };

    const handleResend = (e) => {
        e.preventDefault();
        // Resend OTP logic here
        alert('Resending OTP...');
    };

    return (
        <div style={{minHeight:'100vh'}} className="container d-flex justify-content-center align-items-center">
            <div  className="col-sm-12 col-md-6 col-lg-4">
            {show && <div className="alert alert-success text-center mb-0" role="alert">
                OTP verification successfull
            </div>}
            <h2 className='my-1 p-1'>OTP Verification</h2>
            <span className='text-center text-muted mx-1 p-1'>Enter the verification code here</span>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control my-3"
                        placeholder="Enter OTP"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-danger btn-block w-100">
                    Verify
                </button>
                <div className='d-flex gap-1 mt-2'>
                    <span className='text-center text-muted m-0 p-0'>Didn't receive any code?</span>
                    <button onClick={handleResend} className='btn btn-transparent m-0 p-0 tex' style={{ color: 'blue' }}>Resend</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default OtpVerification;
