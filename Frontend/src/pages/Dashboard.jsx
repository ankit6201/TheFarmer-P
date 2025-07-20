import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const {user,logOut} = useContext(AuthContext)
    const navigat = useNavigate()
    const handleLogOut = ()=>{
        logOut();
        toast.success("logOut Successfull");
        navigat('/login')
    }
  return (
    <div>
      <h2>Welcome:{user?.name}</h2>
      <p>Email:{user?.email}</p>

      <button onClick={handleLogOut}>LogOut</button>
      <hr />
       <p>Dashboard content goes here.</p>
       <p><Link to='/fields'>Go To Fields</Link></p>
       <p><Link to='/crops'>Go To Crops</Link></p>
       <p><Link to="/tasks">Go to Tasks</Link></p>

    </div>
  )
}

export default Dashboard
