import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import NavBar from './NavBar'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import myShowsAction from '../redux/actions/myShowsAction'
import axios from 'axios'
import { BASE_URL } from '../api/url'
import Shows from './Shows'

export default function MyShows() {
    const filtrarShows = useSelector(store => store.myShowsReducer.showsFiltrados)
    const { user, _id , token} = useSelector(store => store.signInReducer)
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    const dispatch = useDispatch()
    const Swal = require('sweetalert2')
    const [addCity, setAddCity] = useState({
        "_id": "",
        "hotelId": "",
        "name": "",
        "description": "",
        "photo": "",
        "price": "",
        "date": "",
        "userId": _id
    })
    const [addCity1, setAddCity1] = useState({
        "hotelId": "",
        "name": "",
        "description": "",
        "photo": "",
        "price": "",
        "date": "",
        "userId": _id

    })

    const readInput = (e) => {
        const value = e.target.value
        const prop = e.target.name
        setAddCity({
            ...addCity,
            [prop]: value
        })
    }
    const readInput1 = (e) => {
        const value = e.target.value
        const prop = e.target.name
        setAddCity1({
            ...addCity1,
            [prop]: value
        })
    }

    useEffect(() => {
       dispatch(myShowsAction.filtrarShows(_id));
    }, []);

    async function deleteShows(e) {
        console.log(e)
        let g = {
            idCity:e,
            token:token
         }
        await dispatch(myShowsAction.eliminarShows(g))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Show Delete',
            showConfirmButton: false,
            timer: 1500
        })
        await dispatch(myShowsAction.filtrarShows(_id))
    }

    async function ValidateInfo(e) {
        e.preventDefault()
        await axios.patch(`${BASE_URL}/api/shows/${addCity._id} `, addCity, headers)
            .then(function (response) {
                console.log(response.data)
                if (response.data.success) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Show Edit',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    dispatch(myShowsAction.filtrarShows(_id))

                }
                else {
                    Swal.fire({
                        title: 'Error!',
                        text: response.data.message.join("- - - - -"),
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'The Shows was not edit',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            })

    }
    async function ValidateInfo1(e) {
        e.preventDefault()
        await axios.post(`${BASE_URL}/api/shows`, addCity1, headers)
            .then(function (response) {
                console.log(response.data)
                if (response.data.success) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Show Edit',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    dispatch(myShowsAction.filtrarShows(_id))

                }
                else {
                    Swal.fire({
                        title: 'Error!',
                        text: response.data.message.join("- - - - -"),
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'The Shows was not edit',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            })

    }
    return (
        <>
            <div className='image_back'>
                <div className='container'>
                    <div className='container1'>
                        <h1 className='h1_2'>Enter the Show information</h1>
                        <form>
                            <label className='.titulo' htmlFor="">Id</label>
                            <input className='input' name="_id" type="text" placeholder='_id' onChange={readInput} required />
                            <label className='.titulo' htmlFor="">Hotel Id</label>
                            <input className='input' name="hotelId" type="text" placeholder='Hotel Id' onChange={readInput} required />
                            <label className='.titulo' htmlFor="">Name</label>
                            <input className='input' name="name" type="text" placeholder='Show´s Name' onChange={readInput} required />
                            <label className='.titulo' htmlFor="">Description</label>
                            <input className='input' name="descripcion" type="text" placeholder='descripcion' onChange={readInput} required />
                            <label className='.titulo' htmlFor="">Photo</label>
                            <input className='input' name="photo" type="text" placeholder='Photo' onChange={readInput} required />
                            <label className='.titulo' htmlFor="">Price</label>
                            <input className='input' name="price" type="number" placeholder='Price' onChange={readInput} required />
                            <label className='.titulo' htmlFor="">Date</label>
                            <input className='input' name="date" type="number" placeholder='date' onChange={readInput} required />
                
                        <button className='boton a send1' onClick={e => ValidateInfo(e)}>Edit Show</button>
                        </form>
                        <h1 className='h1_2'>Edit the Show information</h1>
                        <form action="">
                        <label className='.titulo' htmlFor="">Hotel Id:
                        <input className='input' onChange={readInput1} name="hotelId" type="text" place="Hotel Id" id="hotelId" />
                        </label>
                        <label className='.titulo' htmlFor="">Name:
                        <input className='input' onChange={readInput1} name="name" type="text" place="Name" id="name" />
                        </label>
                        <label className='.titulo' htmlFor="">Photo:
                        <input className='input' onChange={readInput1} name="photo" type="text" place='Photo' id="Photo1" />
                        </label>
                        <label className='.titulo' htmlFor="">Description:
                        <input className='input' onChange={readInput1} name="description" type="text" place="Description" id="description" />
                        </label>
                        <label className='.titulo' htmlFor="">Price:
                        <input className='input' onChange={readInput1} name="price" type="number" place="Price" id="price" />
                        </label>
                        <label className='.titulo' htmlFor="">Date:
                        <input className='input' onChange={readInput1} name="date" type="number" place="Date" id="date" />
                        </label>
                        
                        <button className='boton a send1' onClick={e => ValidateInfo1(e)}>New Show</button>
                    </form>
                    </div>
                    <div> {filtrarShows.map((e) => (<> <Shows Shows _id={e._id} name={e.name} photo={e.photo} description={e.description} price={e.price} /> <button className=' boton a send1' name={e._id} onClick={e => deleteShows(e.target.name)}>Delete</button></>))} </div>
                </div>
            </div>
        </>
    )
}
