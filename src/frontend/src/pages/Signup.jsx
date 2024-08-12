import React, { useState } from 'react';
import { Heading,InputBox,Button,ButtonWarning } from '../components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/signup', formData);
    
            // Reset the form data
            setFormData({
                username: '',
                firstname: '',
                lastname: '',
                password: '',
            });
    
            // Optionally, show a success message
            alert('Sign-up successful! now you can login');
            navigate('/signin');
        } catch (error) {
            let errorMessage = 'An error occurred during sign-up. Please try again.';
    
            if (error.response) {
                // Server responded with an error status code
                errorMessage = error.response.data.error || 'Sign-up failed. Please check the details and try again.';
            } else if (error.request) {
                // Request was made but no response was received
                errorMessage = 'No response from server. Please check your internet connection.';
            } else {
                // Something else triggered an error
                errorMessage = error.message;
            }
    
            // Display the error message as an alert
            alert(errorMessage);
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full sm:max-w-sm md:max-w-md">
                <Heading title="Sign up" />
                <InputBox label="Username" type="text" placeholder={'Jhon@123'} onChange={handleChange} name="username" value={formData.username}/>
                <InputBox label="Firstname" type="text" placeholder={'Doe'} onChange={handleChange} name="firstname" value={formData.firstname}/>
                <InputBox label="Lastname" type="text" placeholder={'Jhone'} onChange={handleChange} name="lastname" value={formData.lastname}/>
                <InputBox label="Password" type="password" placeholder={'12345'} onChange={handleChange} name="password" value={formData.password}/>
                <div className='pt-4'>
                    <Button label="Sign up" type="submit" />
                </div>
                <ButtonWarning label="Already have an account?" buttonText="signin" buttonLink={'/signin'}/>
            </form>
        </div>
    );
};

export default Signup;
