import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Table, Button } from "react-bootstrap";
import BookDataService from "../services/book.services";
import SearchBar from './SearchBar';

const BooksList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    try{
      await BookDataService.deleteBook(id);
      window.alert('Complaint Deleted successfully!');
      getBooks();
    }catch(err){
      window.alert('Error in Deleting Complaint!');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.complaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>

      <Link to="/" className="edit" style={{
                        textDecoration: 'none',
                        color: 'blue',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        fontSize: '23px',
                        padding: '15px',
                      }} >
              Add New Complaint
      </Link>

      <SearchBar handleSearch={handleSearch} />

      <div className="mb-2">
        <Button variant="dark edit" onClick={getBooks}>
          Refresh List
        </Button>
      </div>
      
      <Table striped bordered hover size="sm" >
        <thead>
          <tr>
            <th>#</th>
            <th>School Name</th>
            <th>Customer Name</th>
            <th>Complaint Number</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Product</th>
            <th>Serial Number</th>
            <th>Nature of Complaint</th>
            <th>Status</th>
            <th>Action</th>            
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((doc, index) => (
            <tr key={doc.id}>
              <td>{index + 1}</td>
              <td>{doc.author}</td>
              <td>{doc.title}</td>
              <td>{doc.complaint}</td>
              <td>{doc.phone}</td>
              <td>{doc.address}</td>
              <td>{doc.product}</td>
              <td>{doc.serialno}</td>
              <td>{doc.nature}</td>
              <td>{doc.status}</td>
              <td>
                <Link className="edit" variant="secondary" to={`/edit-complaint/${doc.id}`}  style={{
                  textDecoration: 'none',
                  color: 'blue',
                  fontWeight: 'bold',
                  fontSize: '15px',
                }}>
                Edit
                </Link>
                <Button
                  variant="danger"
                  className="delete"
                  onClick={() => deleteHandler(doc.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>

      </Table>
    </>
  );
};

export default BooksList;
