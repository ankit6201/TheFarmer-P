import axios from '../api/axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })
    const {login} = useContext(AuthContext) 
    const navigat = useNavigate()

    const handleChange =(e)=>{
         setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    
    const handleSubmitform = async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post('/auth/login', formData)
            login(res.data);
            toast.success('login Successfull!')
            navigat('/dashboard')
            
            
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login Failed') 
            
        }

    }
  return (
    <div>
       <h2>Login</h2>
      <form onSubmit={handleSubmitform} className="space-y-4 max-w-md mx-auto mt-6">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
           className="w-full p-2 border border-gray-300 rounded"
        /><br/>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        /><br/>
        <button 
        type="submit"     
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
>Login</button>
      </form>
    </div>
  )
}

export default Login
