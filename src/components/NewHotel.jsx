import React from 'react'
import {useState } from 'react'

export default function FormHotel() {
  let [hotel, setHotel]= useState([])
  let [form, setForm] = useState({});


let handleChange = (e) => {

  setForm({
    ...form,
  [ e.target.name]: e.target.value,
  })

}   
  
let handleSubmit=(e)=>{
  e.preventDefault()

/*   axios.post(`${BASE_URL}/api/hotels/`, form) */
    .then(response=>
      setHotel(response.data.response))
    .catch(error=> console.log(error))

}

console.log(hotel)
      return (
        <>
      { hotel.length === 0
    ?(<form className='sign-in'   >

        <h3>Enter the Hotel information</h3>
          <input name= "name"  type="text"  placeholder='Hotel´s Name' onChange={handleChange} required/>
          <input name="photo" type="text"  placeholder='Photo' onChange={handleChange} required/>
          <input name="capacity" type="number"  placeholder='Capacity' onChange={handleChange} required/>
          <input name="cityId" type="text"  placeholder='City Id' onChange={handleChange} required/>
          <input name="userId" type="text"  placeholder='Your Id' onChange={handleChange} required/>

        <button  className=' button login' onClick={handleSubmit}>Add Hotel</button>
        </form>
      )
      :(
      <>
      <h3>Hotel Added</h3>
{/*       <Details name={hotel.name} image={hotel.photo} category="Capacity" number={hotel.capacity}/>  */}
      <div className='card-button' onClick={()=> { window.location.reload() }}> Go Back</div>
      </>
      )
      }
          
        </>
      );
    
}