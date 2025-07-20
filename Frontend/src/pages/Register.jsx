import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'
import { toast } from 'react-toastify';

const Register = () => {
    const [formData,setFormData] =useState({
       name:"",
       email:"",
       password:"" 
    })
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleOnChange = (e)=>{
        
        setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('/auth/register', formData)
            login(res.data)  // Store user & token in context
            toast.success('Registered successfully!')
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed!');
        }
    }
  return (
    <div>
      <h2>Register</h2>
<form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-6">
         <input type="text"
          placeholder='Enter Your Name'
          name='name'
          value={formData.name}
          onChange={handleOnChange}
          required
          className="w-full p-2 border border-gray-300 rounded"

          />
          <br />
          <input
           type="email" 
           placeholder='write Your Email Email'
           name='email'
           value={formData.email}
           onChange={handleOnChange}
           required
          className="w-full p-2 border border-gray-300 rounded"

          />
          <br />
           <input
           type="password" 
           placeholder='write Your Password'
           name='password'
           value={formData.password}
           onChange={handleOnChange}
           required
           className="w-full p-2 border border-gray-300 rounded"

          />
          <br />
          <button
           type='submit'    
           className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
>Register</button>
        </form>
    </div>
  )
}

export default Register
