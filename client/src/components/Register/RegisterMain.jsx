import bgImage from '../../assets/gif/bgImage.jpg'

import React, { useState } from 'react';
import axios from '../../axios/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showloading } from '../../redux/features/alertSlice';

function RegisterMain() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate()
  const handleFormSubmit = async (e) => {
    dispatch(showloading())
    e.preventDefault();
    try {
      // Send the form data to the server
      const { name, email, password } = formData;
      const response = await axios.post('/register', { name, email, password });

      // Handle the response (e.g., redirect on success or display an error message)
      if (response.data.success) {
        dispatch(hideLoading())
        navigate('/login')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='h-screen flex justify-center items-center' style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: 'repeat', backgroundSize: 'cover' }}>
      <form className='flex flex-col justify-start items-center rounded-xl border-gray-200 border-[2px] shadow-lg w-[90%] lgw-[30%] bg-white pb-5' onSubmit={handleFormSubmit}>
        <div className='bg-[#2C666E] rounded-t-xl w-full pt-5 pb-2 mb-5'>
          <h1 className='text-white font-bold text-center text-2xl'>USER REGISTER</h1>
        </div>
        <p className='text-left w-[90%] font-semibold text-lg'>Name</p>
        <input
          type='text'
          name='name'
          placeholder='Name'
          className='border-gray-400 rounded-lg border w-[90%] my-2 h-12 pl-5'
          value={formData.name}
          onChange={handleInputChange}
        />
        <p className='text-left w-[90%] font-semibold text-lg'>Email</p>
        <input
          type='text'
          name='email'
          placeholder='Email'
          className='border-gray-400 rounded-lg border w-[90%] my-2 h-12 pl-5'
          value={formData.email}
          onChange={handleInputChange}
        />
        <p className='text-left w-[90%] font-semibold text-lg mt-4'>Password</p>
        <input
          type='password'
          placeholder='Password'
          name='password'
          className='border-gray-400 rounded-lg border w-[90%] my-2 h-12 pl-5'
          value={formData.password}
          onChange={handleInputChange}
        />
        <p className='text-left w-[90%] font-semibold text-lg mt-4'>Confirm Password</p>
        <input
          type='password'
          placeholder='Confirm Password'
          name='confirmPassword'
          className='border-gray-400 rounded-lg border w-[90%] my-2 h-12 pl-5'
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <button type='submit' className='bg-[#2C666E] text-white font-semibold px-5 py-1 rounded-lg text-lg mt-3'>
          Signup
        </button>
        <p className='mt-3'>
          Already have an account? <a href='/login' className='text-sky-500'>Login</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterMain;
