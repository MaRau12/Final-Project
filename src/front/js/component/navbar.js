import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [transportName, setTransportName] = useState('');
  const [searchPrice, setSearchPrice] = useState('');

  const handleInputChange1 = (event) => {
    setTransportName(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setSearchPrice(event.target.value);
  };

  const handleSearch = async (e) =>{
    const response = await fetch(`${process.env.BACKEND_URL}/api/transport_by_name/?name=${transportName}&price=${searchPrice}`);
    const data = await response.json();
    actions.setSearchResults(data.posts);
    console.log(data);
  };

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
            id="search-query"
            name="search-query"
            value={transportName}
            onChange={handleInputChange1}
          />
            <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search-query"
            name="search-query"
            value={searchPrice}
            onChange={handleInputChange2}
          />
          <Link to="/searchresult">
            <button className="btn btn-outline-success" onClick={handleSearch}>
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
