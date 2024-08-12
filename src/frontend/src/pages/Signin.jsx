import React, { useState } from 'react';
import { Heading,InputBox,Button,ButtonWarning } from '../components';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8000/api/v1/user/signin', formData);

        // Reset the form data
        setFormData({
            username: '',
            password: '',
        });

        // Store the token in local storage
        localStorage.setItem('token', response.data.token);

        // Optionally, redirect the user or display a success message
        alert('Sign-in successful!');
        navigate('/dashboard');
    } catch (error) {
        let errorMessage = 'An error occurred during sign-in. Please try again.';

        if (error.response) {
            // Server responded with an error status code
            errorMessage = error.response.data.error || 'Invalid credentials. Please check your username and password.';
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
            <form
                className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full sm:max-w-sm md:max-w-md" onSubmit={handleSubmit}>
                <Heading title="Sign in" />
                <InputBox label="Username" type="text" placeholder={'jhon@124'} onChange={handleChange} name={'username'} value={formData.username}/>
                <InputBox label="Password" type="password" placeholder={'12345'} onChange={handleChange} name={'password'} value={formData.password}/>
                <div className='pt-4'>
                    <Button label="Sign in" type="submit" />
                </div>
                <ButtonWarning label="Don't have an account?" buttonText="signup" buttonLink={'/signup'}/>
            </form>
        </div>
  )
}

export default Signin