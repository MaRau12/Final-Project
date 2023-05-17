import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import logo from "../../img/logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const [transportName, setTransportName] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTime, setSearchTime] = useState("");

  const handleInputChange1 = (event) => {
    setTransportName(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setSearchPrice(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setSearchFrom(event.target.value);
  };

  const handleInputChange4 = (event) => {
    setSearchTime(event.target.value);
  };
  const handleSearch = async (e) => {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/transport_by_name/?name=${transportName}&price=${searchPrice}&from_location_search=${searchFrom}&travel_time=${searchTime}`
    );

    const data = await response.json();
    actions.setSearchResults(data.posts);
    console.log(data);
  };

  const handleLogout = async () => {
    sessionStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="no-underline">
          {/* <img src={logo} className="logo" /> */}
          <h1 className="navbar-brand">Travel Tales</h1>
        </Link>
        <div className="d-flex">
          <button
            className="pulse"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Search Trips
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Where do you want to go?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    className="form-control me-2 mb-2"
                    type="search"
                    placeholder="Maximum Price"
                    aria-label="Search"
                    id="search-query"
                    name="search-query"
                    value={searchPrice}
                    onChange={handleInputChange2}
                  />
                  <input
                    className="form-control me-2 mb-2"
                    type="search"
                    placeholder="From or To City"
                    aria-label="Search"
                    id="search-query"
                    name="search-query"
                    value={searchFrom}
                    onChange={handleInputChange3}
                  />

                  <input
                    className="form-control me-2 mb-2"
                    type="search"
                    placeholder="Optional: Transport"
                    aria-label="Search"
                    id="search-query"
                    name="search-query"
                    value={transportName}
                    onChange={handleInputChange1}
                  />

                  <input
                    className="form-control me-2 mb-2"
                    type="search"
                    placeholder="Optional: Trip duration"
                    aria-label="Search"
                    id="search-query"
                    name="search-query"
                    value={searchTime}
                    onChange={handleInputChange4}
                  />
                </div>
                <div className="modal-footer">
                  <Link to="/searchresult">
                    <button
                      className="btn btn-outline-success"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {store.currentUser.id ? (
          <div className="dropdown">
            <button
              className="offset dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Profile img
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/">
                  Welcome{" "}
                  {store.currentUser.user_name.charAt(0).toUpperCase() +
                    store.currentUser.user_name.slice(1)}
                  !
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/userprofile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/newpost">
                  Create new post
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li onClick={handleLogout}>
                <a className="dropdown-item" href="#">
                  LogOut
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <button className="offset">LogIn</button>
          </Link>
        )}
      </div>
    </nav>
  );
};
