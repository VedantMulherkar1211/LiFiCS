import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] =useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  async function handleSubmit(event){
    event.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (res.data.success) {
        navigate('/'); // redirects to Dashboard route
        // Optional: Redirect to dashboard
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.error("Login error", error);
       setError('Something went wrong. Please try again.');
    }
  }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
      <div className='p-3 bg-white w-25 rounded'>
        <h4 className='mb-3 text-center'>Login</h4>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label>Email</label>
            <input 
              type="email" 
              className='form-control' 
              value={email}
              onChange={e => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className='mb-3'>
            <label>Password</label>
            <input 
              type="password" 
              className='form-control'
              value={password}
              onChange={e => setPassword(e.target.value)} 
              required
            />
          </div>
          <button className='btn btn-success w-100'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
