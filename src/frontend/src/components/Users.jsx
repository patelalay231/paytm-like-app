import axios from 'axios';
import React, { useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('')
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/user/bulk?filter='+filter,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            setUsers(response.data.user)
        })
    }, [filter])

    return (
        <div className="p-8 mx-auto bg-white borounded-lg">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <input
                type="text"
                placeholder="Search users..."
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
            />
            <ul>
                {users.map((user) => (
                    <li
                        key={user._id} className="flex justify-between items-center p-2 border-b border-gray-200">
                        <span className="text-gray-700">{user.username}</span>
                        <button onClick={(e)=>{
                            navigate('/send?id='+user._id+"&name=" + user.username);
                        }} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900">
                            Send Money
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users