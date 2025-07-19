import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from '..//api/axios';
import { toast } from 'react-toastify';

const Fields = () => {
    const {user} = useContext(AuthContext)
    const [fields,setFields] = useState([]);
     const [name,setName] = useState('');
     const [area,setArea] = useState('')
     const [location,setLocation] = useState('')
     // Fetch Fields 

     const fetchFields  = async()=>{
        try {
            const res = await axios.get('/fields',{
                headers:{Authorization:`Bearer ${user.token}`},
            })
            setFields(res.data)
        } catch (error) {
            setFields([]);
            toast.error(error?.response?.data?.message || 'Error fetching fields')
            
        }
     }

     useEffect(() => {
    if (user?.token) {
        fetchFields();
    }
  }, [user]);
    
  // add New Field 

  const addField = async (e)=>{
          e.preventDefault()
          if (!name || !area) {
            toast.error("Name And Area Are required")
            return
          }

          try {
            await axios.post('/fields',{name,area,location},
                {headers:{Authorization:`Bearer ${user.token}`}}
            )
            toast.success("Fields added Successfully")
            setName('')
            setArea('')
            setLocation('')
            fetchFields()
          } catch (error) {
            toast.error(error.response?.data?.message || "Error Adding  Field")
          }
  }

  // deleing the Fields 
 const deleteData = async(id)=>{
    if (!window.confirm('Are You sure You Want To Delete This one?')) return;

    console.log("Deleting field:", id);
    console.log("Token:", user.token);

    try {
        await axios.delete(`/fields/${id}`, {
           headers: { Authorization: `Bearer ${user.token}` }
        });
        toast.success("Data Deleted...");
        setFields(prev => prev.filter(f => f._id !== id));
    } catch (error) {
        console.log("Delete error:", error.response);
        toast.error(error.response?.data?.message || "Error deleting Fields");
    }
}

  return (
    <div>
      <h2>Your Field</h2>
      <form action="" onSubmit={addField}>
        <input type="text"
        placeholder='Enter Field Name '
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />{ ''}
        <input type="number"
        placeholder='Area'
        value={area}
        onChange={(e)=>setArea(e.target.value)}
        />{ ''}
        <input type="text"
        placeholder='Location (optional)'
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
        />{ ''}
         <button type="submit">Add Field</button>
      </form>

      <ul>
{Array.isArray(fields) && fields.map((field) => (
   <li key={field._id}>
       {field.name} - {field.area} - {field.location}{' '}
       <button onClick={() => deleteData(field._id)}>Delete</button>
   </li>
))}

      </ul>

    </div>
  )
}

export default Fields
