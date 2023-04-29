import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
  const { store, actions } = useContext(Context);

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
        {store.currentUser ? (
          <Link to="/userprofile">
            <button className="btn btn-outline-warning " >
              {store.currentUser.user_name}
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="btn btn-outline-primary" >
              Login
            </button>
          </Link>
        )}


      </div>
    </nav>
  );
};
