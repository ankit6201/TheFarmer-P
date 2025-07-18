import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

const Register = () => {
    const [formdata,setFormData] =useState({
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
            const res = await axios.post('/auth/register',formdata);
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
          value={formdata.name}
          onChange={handleOnChange}
          required
          />
          <br />
          <input
           type="email" 
           placeholder='write Your Email Email'
           name='email'
           value={formdata.email}
           onChange={handleOnChange}
           required
          />
          <br />
           <input
           type="email" 
           placeholder='write Your Password'
           name='password'
           value={formdata.password}
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
