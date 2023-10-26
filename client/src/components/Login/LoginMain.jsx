import React, { useState } from 'react'
import bgImage from '../../assets/gif/bgImage.jpg'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showloading } from '../../redux/features/alertSlice';
import { toast } from 'react-toastify';
import { useUserLoginMutation } from '../../redux/features/api/apiSlice';

function LoginMain() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login,{isLoading} ] =useUserLoginMutation()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      toast.error('Fill in all fields')
      return
    }
    dispatch(showloading())
    if(isLoading){
      return
    }
    try {
     
     const response = await login(formData)
      console.log(response);
      if (response?.data.success) {
        toast.success('Login succesful')
        dispatch(hideLoading())
        localStorage.setItem("token", response.data.token)
        navigate('/')
      } else {
        toast.error('error occurred')
        dispatch(hideLoading())
      }
    } catch (error) {
      toast.error('error occurred')
      dispatch(hideLoading())
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
      <form className='flex flex-col justify-start items-center rounded-xl border-gray-200 border-[2px] shadow-lg w-[90%] lg:w-[30%] bg-white pb-5' onSubmit={handleFormSubmit}>
        <div className='bg-[#2C666E] rounded-t-xl w-full pt-5 pb-2 mb-5'>
          <h1 className='text-white font-bold text-center text-2xl'>USER LOGIN</h1>
        </div>
        <p className='text-left w-[90%] font-semibold text-lg'>Email</p>
        <input
          type='email'
          name='email'
          placeholder='Email'
          className='border-gray-400 rounded-lg border w-[90%] my-2 h-12 pl-5'
          value={formData.email}
          onChange={handleInputChange}
        />
        <p className='text-left w-[90%] font-semibold text-lg mt-4'>Password</p>
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='border-gray-400 rounded-lg border w-[90%] my-2 h-12 pl-5'
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type='submit' className='bg-[#2C666E] text-white font-semibold px-5 py-1 rounded-lg text-lg mt-3'>
          Login
        </button>
        <p className='mt-3'>
          Not a registered user? <a href='/register' className='text-sky-500'>Signup</a>
        </p>
      </form>
    </div>
  )
}

export default LoginMain