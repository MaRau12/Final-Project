import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { Map } from "../component/map";

export const NewPost = () => {
  const { store } = useContext(Context);

  const [newPost, setNewPost] = useState({
    title: "",
    country: "",
    from_location: {},
    to_location: {},
    trip_duration: 0,
    price: 0,
    transports: [{}],
    description: "",
  });

  function setFrom(city) {
    setNewPost({ ...newPost, from_location: city });
  }
  function setTo(city) {
    setNewPost({ ...newPost, to_location: city });
  }

  async function postCity(city) {
    console.log(city);
    const response = await fetch(process.env.BACKEND_URL + "/api/city", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(city),
    });
    if (response.ok) {
      console.log("success");
    }
  }

  async function post() {
    console.log(transports);
    const response = await fetch(process.env.BACKEND_URL + "/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(newPost),
    });
    if (response.ok) {
      console.log("success");
    }
  }

  async function validations() {
    console.log(newPost);
    // postCity(from_location);
    // post();
  }

  return (
    <div className="text-center">
      <div className="d-flex justify-content-center border-bottom mt-3 p-3 ">
        <i className="fa-solid fa-circle-plus fa-2xl mp-0"></i>
        <h3 className="ms-3">New post</h3>
      </div>

      <div className="bg-light border-botto_locationm p-3">
        <div className="row g-3 justify-content-center mb-3">
          <div className="col-md-5">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="My amazing trip!"
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <div className="validation"></div>
          </div>

          <div className="col-md-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              className="form-select"
              onChange={(e) => {
                setNewPost({ ...newPost, country: e.target.value });
              }}
            >
              {store.countries.countries &&
                store.countries.countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
            </select>
            <div className="validation"></div>
          </div>
        </div>

        {/*  --------- MAP --------- */}
        <div className="row g-3 justify-content-center mb-3">
          {newPost.country && (
            <Map newPost={newPost} setFrom={setFrom} setTo={setTo} />
          )}
        </div>

        <div className="row g-3 justify-content-center mb-3y">
          <div className="col-md-2 col-sm-6">
            <label className="form-label">Trip trip_duration</label>
            <div className="input-group">
              <input
                type="test"
                className="form-control"
                onChange={(e) =>
                  setNewPost({ ...newPost, trip_duration: e.target.value })
                }
              />
              <span className="input-group-text">hrs</span>
            </div>
            <div className="validation"></div>
          </div>
          <div className="col-md-2 col-sm-6">
            <label className="form-label">Price</label>
            <div className="input-group">
              <input
                type="test"
                className="form-control"
                onChange={(e) =>
                  setNewPost({ ...newPost, price: e.target.value })
                }
              />
              <span className="input-group-text">€</span>
            </div>
            <div className="validation"></div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Transports</label>
            <div className="input-group d-flex rectangle justify-content-center rounded bg-light">
              {store.transports.data &&
                store.transports.data.map((transport) => (
                  <div
                    key={transport.id}
                    className="form-check form-check-inline"
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={transport.name}
                      onChange={(e) => {
                        setNewPost({
                          ...newPost,
                          transports: transport,
                        });
                      }}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      <i className={transport.icon}></i>
                    </label>
                    <div className="validation"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="row g-3 justify-content-center mb-3">
          <div className="col-md-8 justify-content-end">
            <label htmlFor="message" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              rows="7"
              onChange={(e) =>
                setNewPost({ ...newPost, description: e.target.value })
              }
            ></textarea>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-evenly mb-5 p-2">
        <div className="col-2">
          <Link to={"/userprofile"}>
            <button className="btn btn-secondary p-3">Delete</button>
          </Link>
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary p-3"
            type="submit"
            onClick={() => validations()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
