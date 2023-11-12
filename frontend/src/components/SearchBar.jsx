import React from "react";
import Form from "react-bootstrap/Form";
// import Button from 'react-bootstrap/Button';
import { Button } from "./subcomponents/Button.jsx";

const SearchBar = ({ searchField, setSearchField, fetchMovieData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    let urlEncodedSearchField = encodeURIComponent(searchField);

    fetchMovieData(urlEncodedSearchField);
  };

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-11 search">
        <Form
          id="search-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Form.Group className="input-group input-group-lg">
            <Form.Control
              value={searchField}
              onChange={(e) => {
                setSearchField(e.target.value);
              }}
              className="form-control search-bar"
              id="search-bar"
              placeholder="Search for a movie or series..."
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default SearchBar;
