import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file for Dashboard styling

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState('');
    const usersPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://6672a8fd6ca902ae11b13670.mockapi.io/login');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch user data.');
            }
        };

        fetchUsers();
    }, []);

    // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleLogout = () => {
        sessionStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            {error && <div className="error">{error}</div>}
            {currentUsers.length > 0 ? (
                <>
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Business Legal Name</th>
                                <th>User Handle</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.businessName}</td>
                                    <td>{user.userHandle}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.password}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                            <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
};

export default Dashboard;
