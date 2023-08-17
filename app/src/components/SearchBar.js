import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ handleSearch }) => {
    return (
        <Form className="mb-3">
            <Form.Control
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                className="form-control form-control-lg font-weight-bold"
            />
    </Form>
    );
};

export default SearchBar;
