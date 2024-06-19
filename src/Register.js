import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import Logo from './Logo.png'; 

const Register = () => {
    const [businessName, setBusinessName] = useState('');
    const [userHandle, setUserHandle] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('https://6672a8fd6ca902ae11b13670.mockapi.io/login', {
                businessName,
                userHandle,
                email,
                phone,
                password
            });
            setSuccess('Registration successful!');
            console.log('Registration successful:', response.data);
            
            setBusinessName('');
            setUserHandle('');
            setEmail('');
            setPhone('');
            setPassword('');
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <div className="logo">
                <img src={Logo} alt="logo" />
            </div>
            <div className="register-box">
                <h1 className="register-title">Merchant Registration</h1>
                <p>Enter your account details </p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="businessName">Business Legal Name</label>
                        <input 
                            type="text" 
                            id="businessName" 
                            placeholder='Enter'
                            value={businessName} 
                            onChange={(e) => setBusinessName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="userHandle">User Handle</label>
                        <input 
                            type="text" 
                            id="userHandle" 
                            placeholder='Enter'
                            value={userHandle} 
                            onChange={(e) => setUserHandle(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder='Enter'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            placeholder='Enter'
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
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
                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}
                    <button type="submit" className="register-button">Register</button>
                </form>
                <div className="login-link">
                    Already have an account? <a href="/login">Login Now</a>
                </div>
                <div className="terms-conditions">
                    By creating an account, you agree to the <a href="/terms">Terms and conditions</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
