import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/book.services";

const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [complaint, setComplaint] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ error: false, msg: "" }); // Clear previous message

    if (title === "" || author === "" || complaint === "" || phone === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const newBook = {
      title,
      author,
      complaint,
      phone,
      status,
    };

    try {
      if (id !== undefined && id !== "") {
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Updated Successfully!" });
      } else {
        await BookDataService.addBooks(newBook); 
        setMessage({ error: false, msg: "New Complaint Added Successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    // Clear input fields after submission
    setTitle("");
    setAuthor("");
    setPhone("");
    setComplaint("");
  };

  const editHandler = async () => {
    setMessage({ error: false, msg: "" }); // Clear previous message

    try {
      const docSnap = await BookDataService.getBook(id);
      const bookData = docSnap.data();
      setTitle(bookData.title);
      setAuthor(bookData.author);
      setComplaint(bookData.complaint);
      setPhone(bookData.phone);
      setStatus(bookData.status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  return (
    <div className="p-4 box">
      {message.msg && (
        <Alert
          variant={message.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage({ error: false, msg: "" })}
        >
          {message.msg}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBookAuthor">
          <InputGroup>
            <InputGroup.Text id="formBookAuthor">School Name</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookTitle">
          <InputGroup>
            <InputGroup.Text id="formBookTitle">Customer Name</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formComplaintNumber">
          <InputGroup>
            <InputGroup.Text id="formComplaintNumber">Complaint Number</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Complaint Number"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <InputGroup>
            <InputGroup.Text id="formPhoneNumber">Mobile Number</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <ButtonGroup aria-label="Basic example" className="mb-3">
          <Button
            disabled={flag}
            variant="success"
            onClick={() => {
              setStatus("Issue Solved");
              setFlag(true);
            }}
          >
            Issue Solved
          </Button>
          <Button
            variant="danger"
            disabled={!flag}
            onClick={() => {
              setStatus("Issue Not Solved");
              setFlag(false);
            }}
          >
            Issue Not Solved
          </Button>
        </ButtonGroup>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Add/Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddBook;
