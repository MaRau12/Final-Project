import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">ShareTrip</span>
        </Link>
        <div className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <Link to="/searchresult">
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
