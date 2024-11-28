import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Adds = () => {
  const [book,setBook]=useState({
    title:"",
    desc:"",
    price:null,
    cover:""
  })
  const navigate=useNavigate();
  const handle=(e)=>{
    setBook((prev)=>({...prev,[e.target.name]:e.target.value}));
    console.log(book);
  };

  const handleclick= async (e)=>{
    e.preventDefault();
  
    try{
      await axios.post("http://localhost:4000/books",book)
      navigate("/");
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
    <h1>Add a new book to your list</h1>
    <input type="text" placeholder='enter title' onChange={handle} name='title'/>
    <input type="text" placeholder='enter description' onChange={handle} name='desc'/>
    <input type="number" placeholder='enter price' onChange={handle} name='price'/>
    <input type="text" placeholder='enter cover' onChange={handle} name='cover'/>
    <button onClick={handleclick}>submit</button>
    </>
  )
}

export default Adds