import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './components/SignUp';
import OtpVerification from './components/OtpVerification';
import RestaurantList from './components/Restaurent';
import RestaurantDetails from './components/Details';

function App() {
   return (
    <Router>
      <div className="m-0">
        {/* <div> Adjust column width for medium and large devices */}
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/otp" element={<OtpVerification />} />
            <Route path="/restaurents" element={<RestaurantList/>}/>
            <Route path="/detail/:id" element={<RestaurantDetails />} />
          </Routes>
        {/* </div> */}
      </div>
    </Router>
  );
}

export default App;
