import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const [transportName, setTransportName] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  const handleInputChange1 = (event) => {
    setTransportName(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setSearchPrice(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setSearchFrom(event.target.value);
  };

  const handleSearch = async (e) => {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/transport_by_name/?name=${transportName}&price=${searchPrice}&from_location_search=${searchFrom}`
    );

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
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Search Trips!
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
                      className="form-control me-2 "
                      type="search"
                      placeholder="How?"
                      aria-label="Search"
                      id="search-query"
                      name="search-query"
                      value={transportName}
                      onChange={handleInputChange1}
                    />
                    <input
                      className="form-control me-2 "
                      type="search"
                      placeholder="How much?"
                      aria-label="Search"
                      id="search-query"
                      name="search-query"
                      value={searchPrice}
                      onChange={handleInputChange2}
                    />
                    <input
                      className="form-control me-2 "
                      type="search"
                      placeholder="From Where?"
                      aria-label="Search"
                      id="search-query"
                      name="search-query"
                      value={searchFrom}
                      onChange={handleInputChange3}
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
        </div>
        {store.currentUser.id ? (
          <Link to="/userprofile">
            <button className="btn btn-outline-warning ">
              {store.currentUser.user_name}
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="btn btn-outline-primary">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};
