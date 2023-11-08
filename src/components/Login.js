import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from './Alert';
import twitterLogo from '../images/twitter.svg.png';

export function Login() {
  const [user, setUser] = useState({
    user: '',
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const loginField = user.email.includes('@') ? 'email' : 'user';
      await login(user[loginField], user.password);
      const usersCollection = collection(db, 'users');

      const userDoc = {
        username: user.email, 
        
      };

      const docRef = await addDoc(usersCollection, userDoc);

      console.log('Usuario agregado con ID: ', docRef.id);

      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      {error && <Alert message={error} />}

      <div className="bg-white w-full max-w-sm p-4 rounded-lg shadow flex">
        <div className="w-1/2 p-4">
          <img src={twitterLogo} alt="Twitter Logo" className="w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold text-blue-500 mb-4">Inicia Sesión</h1>
        </div>
        <div className="w-1/2 p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email o Usuario
              </label>
              <input
                type="text"
                name="email"
                placeholder="youremail@gmail.com o usuario"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="***********"
                id="password"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover-bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}





