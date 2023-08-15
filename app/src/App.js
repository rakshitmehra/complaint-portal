import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
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
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Complaint Portal</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "700px" }}>
        <Row>
          <Col>
            <AddBook id={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BooksList getBookId={getBookIdHandler} />
          </Col>
        </Row>
      </Container>
      <Analytics />
    </>
  );
}

export default App;
