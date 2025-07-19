import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from '../api/axios'
import { toast } from 'react-toastify'

const Crops = () => {
    const {user} = useContext(AuthContext)
    const [crops,setCrop] = useState([])
    const [fields,setFields] = useState([])
    const [name,setName] = useState('')
    const [variety,setVariety] = useState('')
    const [sowingDate,setSowingDate] = useState('')
    const [harvestDate,setHarvestDate] = useState('')
    const [field,setField] = useState('')

    // fetch Crops 

    const fetchCrops = async () =>{
        try {
            const res = await axios.get('/crops',{
                headers:{Authorization:`Bearer ${user.token}`}
            })
            setCrop(res.data)
        } catch (error) {
            toast.error(error.response?.data.message)
        }
    }
    

    // fetch field for dropdown 
    const fetchField = async()=>{
        try {
            const res = await axios.get('/fields',{headers:{Authorization:`Bearer ${user.token}`}})

            toast.success("Data fetch Successfully")
            setFields(res.data);
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    useEffect(()=>{
        
            fetchCrops()
            fetchField()
        
    },[])

    // Add Crop 

    const addCrop = async(e)=>{
        e.preventDefault();
        if (!name || !field) {
            toast.error("Name Add Field Are required");
            return;
        }

        try {
           await axios.post('/crops',{name,variety,sowingDate,harvestDate,field},{
            headers:{Authorization:`Bearer ${user.token}`},
           })
           toast.success("Crops Field Created")
           setName('')
           setVariety('')
           setSowingDate('')
           setHarvestDate('')
           setField('')
           fetchCrops()
        } catch (error) {
            setCrop([])
            toast.error(error.response?.data?.message)
        }
    }

    // Delete Crop 

    const deleteCrop = async(id)=>{
        if(!confirm("Are You Sure You Want To Delete This")) return;

        try {
            await axios.delete(`/crops/${id}`,{
                headers:{Authorization:`Bearer ${user.token}`}
            });
            toast.success("Data Deleted Successfully")
            fetchCrops()
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }
  return ( 
    <div>
      <h2>Your Crops</h2>
      <form action="" onSubmit={addCrop}>
       <input
          type="text"
          placeholder="Crop Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{' '}
        <input
          type="text"
          placeholder="Variety"
          value={variety}
          onChange={(e) => setVariety(e.target.value)}
        />{' '}
        <input
          type="date"
          value={sowingDate}
          onChange={(e) => setSowingDate(e.target.value)}
        />{' '}
        <input
          type="date"
          value={harvestDate}
          onChange={(e) => setHarvestDate(e.target.value)}
        />{' '}
      <select value={field} onChange={(e)=>setField(e.target.value)}>
    <option value="">--select field--</option>
    {
        fields.map((f)=>(
            <option key={f._id} value={f._id}>{f.name}</option>
        ))
    }
</select>

         <button type="submit">Add Crop</button>
      </form>

      <ul>
        {
            crops.map((crop)=>(
                <li key={crop._id}>
                    {crop.name} -  {crop.variety} - {crop.field?.name} {' '}
                    <button onClick={()=>deleteCrop(crop._id)}>Delte</button>
                </li>
            ))
        }
      </ul>
    </div>
  )
}

export default Crops
