import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Table, Button } from "react-bootstrap";
import BookDataService from "../services/book.services";
import SearchBar from './SearchBar';

const Admin = ({ getAdminId }) => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
        useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        try {
            const data = await BookDataService.getAllBooks();
            setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error("Error fetching books:", error);
        }
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
    const filteredBooks = books.filter((book) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    return (
        (book.title && book.title.toLowerCase().includes(lowerSearchQuery)) ||
        (book.author && book.author.toLowerCase().includes(lowerSearchQuery)) ||
        (book.phone && book.phone.toLowerCase().includes(lowerSearchQuery)) ||
        (book.address && book.address.toLowerCase().includes(lowerSearchQuery)) ||
        (book.product && book.product.toLowerCase().includes(lowerSearchQuery)) ||
        (book.serialno && book.serialno.toLowerCase().includes(lowerSearchQuery)) ||
        (book.nature && book.nature.toLowerCase().includes(lowerSearchQuery)) ||
        (book.assign && book.assign.toLowerCase().includes(lowerSearchQuery)) ||
        (book.status && book.status.toLowerCase().includes(lowerSearchQuery))
        );
    });
  
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
                <th>Assign To</th>
                <th>Status</th>
                <th>Action</th>            
            </tr>
        </thead>
        <tbody>
            {filteredBooks.map((book, index) => (
                <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.author}</td>
                <td>{book.title}</td>
                <td>{index + 202301}</td>
                <td>{book.phone}</td>
                <td>{book.address}</td>
                <td>{book.product}</td>
                <td>{book.serialno}</td>
                <td>{book.nature}</td>
                <td>{book.assign}</td>
                <td>
                <span
                style={{
                    color: book.status === "Issue Resolved" ? "green" : "red",
                    fontWeight: "bold",
                    }}
                >
                {book.status}
                </span>
                </td>
                <td>
                <Link className="edit" variant="secondary" to={`/edit-complaint/${book.id}`}  style={{
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
                    onClick={() => deleteHandler(book.id)}
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

export default Admin;
