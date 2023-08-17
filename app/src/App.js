import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
import { Analytics } from '@vercel/analytics/react';
import "./App.css";

function App() {
  const [bookId, setBookId] = useState("");

  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setBookId(id);
  };
  return (
    <Router>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Onista Complaint Portal</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "750px" }}>
        <Row>
          <Col>
          <Routes>
              <Route path="/" element={<AddBook id={bookId} setBookId={setBookId} />} />
          </Routes>
          </Col>
        </Row>
      </Container>

      <Container style={{ width: "1500px" }}>
        <Row>
          <Col>
          <Routes>
              <Route path="/view" element={<BooksList getBookId={getBookIdHandler} />} />
              <Route path="/edit-complaint/:id" element={<AddBook setBookId={setBookId} />} />
          </Routes>
          </Col>
        </Row>
      </Container>
      <Analytics />
    </Router>
  );
}

export default App;
