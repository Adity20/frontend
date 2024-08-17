import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add this line to declare the 'setError' function
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? '/api/auth/local' : '/api/auth/local/register';
      console.log('Sending request to:', `http://localhost:1337${endpoint}`);
      console.log('Request data:', {
        identifier: isLogin ? email : username,
        username: username,
        email: email,
        password: password
      });
      const response = await axios.post(`http://localhost:1337${endpoint}`, {
        identifier: isLogin ? email : username,
        username: username,
        email: email,
        password: password
      });
      console.log('Response:', response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error('An error occurred:', error.response ? error.response.data : error.message);
      setError(error.response ? JSON.stringify(error.response.data) : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Sign Up' : 'Login'}
      </button>
    </form>
  );
};

export default Auth;