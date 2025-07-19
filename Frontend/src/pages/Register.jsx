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
      <form action="" onSubmit={handleSubmit}>
         <input type="text"
          placeholder='Enter Your Name'
          name='name'
          value={formData.name}
          onChange={handleOnChange}
          required
          />
          <br />
          <input
           type="email" 
           placeholder='write Your Email Email'
           name='email'
           value={formData.email}
           onChange={handleOnChange}
           required
          />
          <br />
           <input
           type="password" 
           placeholder='write Your Password'
           name='password'
           value={formData.password}
           onChange={handleOnChange}
           required
          />
          <br />
          <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register
