import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: ""
  });

  const navigate = useNavigate();

  // Fetch book data when the component mounts
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/update/${id}`);
        setBook(res.data[0]); // Assuming the response is an array with one object
      } catch (err) {
        console.log(err);
      }
    };
    getBook();
  }, [id]);

  // Handle input field changes
  const handle = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  // Handle form submission to update the book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/update/${id}`, book);
      navigate("/"); // Redirect to home page after successful update
    } catch (err) {
      console.log("Error updating book:", err);
    }
  };

  return (
    <>
      <h1>Update the book info with ID {id}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={book.title || ""}
          onChange={handle}
          name="title"
          placeholder="Title"
        />
        <br />
        <input
          type="text"
          value={book.desc || ""}
          onChange={handle}
          name="desc"
          placeholder="Description"
        />
        <br />
        <input
          type="number"
          value={book.price || ""}
          onChange={handle}
          name="price"
          placeholder="Price"
        />
        <br />
        <input
          type="text"
          value={book.cover || ""}
          onChange={handle}
          name="cover"
          placeholder="Cover URL"
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default Update;
