import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from './Logo.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.get('https://6672a8fd6ca902ae11b13670.mockapi.io/login');
            const users = response.data;
            const user = users.find(user => user.userHandle === username && user.password === password);

            if (user) {
                setSuccess('Login successful!');
                console.log('Login successful:', user);
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                setUsername('');
                setPassword('');
                navigate('/dashboard');
            } else {
                setError('***Invalid credentials***');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className='logo'>
                <img src={Logo} alt="logo" />
            </div>
            <div className="login-box">
                <p className="login-title">Merchant Login</p>
                <p>Enter your account details</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder='Enter'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder='Enter'
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    
                <div className="forgot-password">
                    <a href="/forgot-password">Forgot Password?</a>
                </div>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="signup-link">
                    Not a Merchant yet? <a href="/register">Sign up Now</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
