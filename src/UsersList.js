import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', 
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li> // Adjust this according to your user data structure
        ))}
      </ul>
    </div>
  );
};

export default UserList;
