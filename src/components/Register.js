import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import twitterLogo from "../images/twitter.svg.png";

export function Register() {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    user: "",
    email: "",
    password: ""
  });
  const { signup } = useAuth(); 
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(user.email, user.password);

      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex">
        <div className="w-1/6">
          <img src={twitterLogo} alt="Twitter Logo" className="w-16 h-16" />
        </div>
        <div className="w-5/6">
          <div className="text-blue-500 text-2xl font-bold mb-4 text-center">Register</div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">Nombres:</label>
              <input type="text" name="name" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className="block text-gray-600">Apellidos:</label>
              <input type="text" name="lastname" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="user" className="block text-gray-600">Usuario:</label>
              <input type="text" name="user" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">Email:</label>
              <input type="email" name="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="youremail@gmail.com" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">Password:</label>
              <input type="password" name="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="***********" id="password" onChange={handleChange} />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none" type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}


