import React from 'react'
import { useParams } from 'react-router-dom'
import Shows from './Shows'
import HotelCard from './HotelCard'
import NavBar from './NavBar'
import { BASE_URL } from '../../src/api/url'
import { useEffect, useState } from 'react'
import axios from 'axios'



export default function DetailsCity() {
  let {setHotel} = useParams()
  let [api, setApi] = useState([])
  let [apiCo, setApiCo] =useState([])

  useEffect(() => {
    axios.get(`${BASE_URL}/api/hotels/${setHotel}`).then((res) => {
      (setApi(res.data.data))
    })
      .catch(err => console.log(err))
    axios.get(`${BASE_URL}/api/shows`).then((res) => {
      (setApiCo(res.data.data))
    })
      .catch(err => console.log(err))

  }, [])
  
  let it = apiCo.filter(e => e.hotelId === setHotel)
  let basc = ""
  console.log(it)
  if(it.length){
    basc = <>
    <Shows name={it[0].name} photo={it[0].photo[0]} description={it[0].description} price={it[0].price} />
    <Shows name={it[1].name} photo={it[1].photo[0]} description={it[1].description} price={it[1].price}/>
    </>
  }
  else{
    basc = "not shows"
  }
  return (
    <>
    <div className='image_back2'>
    <NavBar/>
    <div className='home3 container cards_flex'>
    <HotelCard name={api.name} photo={api.photo} capacity={api.capacity}/>
    {basc}
    </div>
    </div>
    </>
  )
}