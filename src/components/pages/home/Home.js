import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-300">
      <div className="bg-base-100 p-10 rounded-2xl shadow-lg text-center max-w-xl">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Welcome to
        </h1>
        <h2 className="text-xl md:text-3xl font-semibold text-gray-300">
          Courier & Parcel Management System
        </h2>
        <p className="mt-4 text-gray-400 text-sm md:text-base">
          Manage your parcels efficiently with tracking, delivery assignments, and booking—all in one place.
        </p>
        <button className='btn btn-primary mt-10' onClick={()=>navigate("/Register")}> SignUp</button>
      </div>
    </div>
  );
};

export default Home;
