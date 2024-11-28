import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Books = () => {
    const [books,setBooks]=useState([]);
    useEffect(() => {
        const fetchAllBooks=async()=>{
            try{
                const res=await axios.get("http://localhost:4000/books")
                // console.log(res);
                setBooks(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchAllBooks()
    }, [])

    const handledel= async (bookid)=>{
        try{
            await axios.delete("http://localhost:4000/books/"+bookid);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <>
    <div>

    <h1>Book Shop</h1>
    <div className='books'>
    {
        books.map((book)=>(
            <div className="book" key={book.id}>

            {book.cover && <img src={book.cover} alt="ron" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <p>{book.price}</p>
            <button className="delete" onClick={()=>handledel(book.id)}>delete</button><br />
            <button className="update"><Link to={`/update/${book.id}`}>update</Link></button>
            </div>
            
        ))
    }
    </div>
    
    <button>
        <Link to='/add'>
        add new book
        </Link>
    </button>
    </div>
    
    </>
  )
}

export default Books