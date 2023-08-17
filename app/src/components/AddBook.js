import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import BookDataService from "../services/book.services";

const AddBook = ({ setBookId }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState("");
  const [serialno, setSerialno] = useState("");
  const [nature, setNature] = useState("");
  const [assign, setAssign] = useState("");
  const [status, setStatus] = useState("Issue Not Resolved");
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ error: false, msg: "" }); // Clear previous message

    if (title === "" || author === "" || phone === "" || product === "" || serialno === "" || nature === "" || assign === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const newBook = {
      title,
      author,
      phone,
      address,
      product,
      serialno,
      nature,
      assign,
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
    setAddress("");
    setProduct("");
    setSerialno("");
    setNature("");
    setAssign("");
  };

  const editHandler = async () => {
    setMessage({ error: false, msg: "" }); // Clear previous message

    try {
      const docSnap = await BookDataService.getBook(id);
      const bookData = docSnap.data();
      setTitle(bookData.title);
      setAuthor(bookData.author);
      setPhone(bookData.phone);
      setAddress(bookData.address);
      setProduct(bookData.product);
      setSerialno(bookData.serialno);
      setNature(bookData.nature);
      setAssign(bookData.assign);
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
            <InputGroup.Text id="formBookTitle">Contact Person</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

        <Form.Group className="mb-3" controlId="formAddress">
          <InputGroup>
            <InputGroup.Text id="formAddress">Address</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProduct">
          <InputGroup>
            <InputGroup.Text id="formProduct">Product</InputGroup.Text>
            <select
              className="form-select"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="">Select a product</option>
              <option value="1151+ Mode">1151+ Model</option>
              <option value="1151 Model">1151 Model</option>
              <option value="2151 Model">2151 Model</option>
              <option value="4151 Model">4151 Model</option>
              <option value="Old Black Bell">Old Black Bell</option>
              <option value="CCTV">CCTV</option>
              <option value="Attendance Machine">Attendance Machine</option>
            </select>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSerialNo">
          <InputGroup>
            <InputGroup.Text id="formSerialNo">Serial Number</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Serial Number"
              value={serialno}
              onChange={(e) => setSerialno(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNature">
          <InputGroup>
            <InputGroup.Text id="formNature">Nature Of Complaint</InputGroup.Text>
            <select
              className="form-select"
              value={nature}
              onChange={(e) => setNature(e.target.value)}
            >
              <option value="">Select Complaint Type</option>
              <option value="KeyPad is not Working">KeyPad is not Working</option>
              <option value="Audio is not Playing">Audio is not Playing</option>
              <option value="Date and Time Problem">Date and Time Problem</option>
              <option value="Schedulers are not Working Properly">Schedulers are not Working Properly</option>
              <option value="Bell is not Working">Bell is not Working</option>
              <option value="Speaker is not Working">Speaker is not Working</option>
              <option value="Onista App is not Working">Onista App is not Working</option>
              <option value="CCTV is not Working">CCTV is not Working</option>
              <option value="Attendance machine is not Working">Attendance machine is not Working</option>
              <option value="Battery Issue">Battery Issue</option>
              <option value="SD is not Working">SD is not Working</option>
              <option value="Mic is not Working">Mic is not Working</option>
            </select>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAssign">
          <InputGroup>
            <InputGroup.Text id="formAssign">Assign To</InputGroup.Text>
            <select
              className="form-select"
              value={assign}
              onChange={(e) => setAssign(e.target.value)}
            >
              <option value="">Assign To</option>
              <option value="Sumit">Sumit</option>
              <option value="Rakhi">Rakhi</option>
              <option value="Kiran">Kiran</option>
              <option value="Jaspreet">Jaspreet</option>
              <option value="Harman">Harman</option>
              <option value="Rakshit">Rakshit</option>
              <option value="Khushi">Khushi</option>
              <option value="Guransh">Guransh</option>
              <option value="Aryan">Aryan</option>
            </select>
          </InputGroup>
        </Form.Group>

        <ButtonGroup aria-label="Basic example" className="mb-3">
          <Button
            disabled={flag}
            variant="success"
            onClick={() => {
              setStatus("Issue Resolved");
              setFlag(true);
            }}
          >
            Issue Resolved
          </Button>
          <Button
            variant="danger"
            disabled={!flag}
            onClick={() => {
              setStatus("Issue Not Resolved");
              setFlag(false);
            }}
          >
            Issue Not Resolved
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
