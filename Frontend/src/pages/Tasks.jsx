import React, {  useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from '../api/axios'
import {toast} from 'react-toastify'

const Tasks = () => {
    const {user} = useContext(AuthContext)
    const [tasks,setTasks] = useState([])
    const [crops,setCrops] = useState([])
    const [fields,setFields] = useState([])
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [date,setDate] =useState('')
    const [status,setStatus] = useState('Pending')
    const [field,setField] = useState('')
    const [crop,setCrop] = useState('')

    const fetchTask = async() => {
      try {
        const res = await axios.get('/tasks',{headers:{Authorization:`Bearer ${user.token}`}})
        setTasks(res.data)
        
      } catch (error) {
        toast.error(error.response?.data?.message || "something went Wrong")
      }
    }
   // fetching crop and fields 
    const fetchFieldsAndCrops  = async()=>{
        try {
            const [fieldRes,cropRes] = await Promise.all([
                axios.get('/fields',{headers:{Authorization:`Bearer ${user.token}`}}),
                axios.get('/crops',{headers:{Authorization:`Bearer ${user.token}`}})
            ]);
            setFields(fieldRes.data)
            setCrops(cropRes.data)
        } catch (error) {
         toast.error( error.response?.data?.message || 'Error fetching fields or crops')            
        }
    }

    useEffect(()=>{
        fetchTask();
        fetchFieldsAndCrops();
    },[])

    const addTask = async(e)=>{
        e.preventDefault();

        if (!title || !date || !field) {
            toast.error("Title , Data & Field are Required")
            return;
        }

       try {
         await axios.post('/tasks',{title,description,date,status,field,crop},{headers:{Authorization:`Bearer ${user.token}`}})
         toast.success("data Added")
         setTitle('');
         setDescription('')
         setDate('')
         setStatus('Pending');
         setField('')
         setCrop('')
        fetchTask();
       } catch (error) {
          toast.error(error.response?.data?.message || "Some Thing Went Wrong")
       }
    }

    const deleteTask  = async(id)=>{
        if (!confirm("Are you Conform To Delete This task?")) return;

        try {
            await axios.delete(`/tasks/${id}`,{headers:{Authorization:`Bearer ${user.token}`}})
              toast.success("task delted")
              fetchTask()
        } catch (error) {
    toast.error(error.response?.data?.message || 'Error deleting task');

        }

    }
  return (
    <div>
       <h2>Your Task</h2>
       <form action="" onSubmit={addTask}>
        <input type="text"
        placeholder='Enter Title'
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        />{' '}
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />{' '}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />{' '}
        <select value={status} onChange={(e)=>setStatus(e.target.value)} id="">
             <option value="pending">Pending</option>
            <option value="In progress">In Progress</option>
           <option value="Completed">Completed</option>
        </select>{' '}
        <select value={field} onChange={(e) => setField(e.target.value)}>

            <option value="">--select--field</option>
            {
                fields.map((fi)=>(
                    <option key={fi._id} value={fi._id}>{fi.name}</option>
                ))
            }
        </select>{' '}

        <select value={crop} onChange={(e) => setCrop(e.target.value)}>

       <option value="">--Select crop--</option>
       {
        crops.map((cr)=>(
              <option key={cr._id} value={cr._id}>
             {cr.name}
            </option>
        ))
       }
        </select>

        <button type="submit">Add Task</button>
       </form>

       {
        <ul>
        {tasks.map((task)=>(
            <li key={task._id}>
                {task.title} — {task.status}-{task.date?.slice(0, 10)} — {' '}
                {task.field?.name} — {task.crop?.name}{' '}
                <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
        ))}
       </ul>
       }
    </div>
  )
}

export default Tasks
