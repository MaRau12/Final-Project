import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [transportName, setTransportName] = useState('');

  const handleInputChange = (event) => {
    setTransportName(event.target.value);
  };

  const handleSearch = async (e) =>{
    const response = await fetch(`https://3001-marau12-finalproject-tw7c3mwzusz.ws-eu96b.gitpod.io/api/transport_by_name/?name=${transportName}`);
    const data = await response.json();
    setResults(data);
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
            onChange={handleInputChange}
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
