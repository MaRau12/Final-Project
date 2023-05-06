import React, { useContext, useState } from "react";
import Geocode from "react-geocode";

import { Context } from "../store/appContext";
import { Map } from "../component/map";

export const NewPost = () => {
  const { store } = useContext(Context);

  const [from_location, setFrom_location] = useState({});
  const [to_location, setTo_location] = useState({});

  const allCountries = store.countries.countries;
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

  console.log(newPost.transports);

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
    postCity(from_location);
    // post();
  }

  return (
    <div className="text-center">
      <div className="border-botto_locationm p-3 ">
        <h3>Create new post</h3>
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
              {allCountries &&
                allCountries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
            </select>
            <div className="validation"></div>
          </div>
        </div>

        <div className="row g-3 justify-content-center mb-3">
          {newPost.country && (
            <Map
              newPost={newPost}
              from_location={from_location}
              to_location={to_location}
              setFrom={setFrom}
              setTo={setTo}
            />
          )}
        </div>

        <div className="row g-3 justify-content-center mb-3">
          <div className="col-md-2">
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
          <div className="col-md-2">
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
            <div className="cards d-flex justify-content-center">
              <div className="rectangle rounded bg-secondary p-2">
                {store.transports.data &&
                  store.transports.data.map((transport) => (
                    <div
                      key={transport.id}
                      className="form-check form-check-inline"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        value={transport.name}
                        onChange={(e) => {
                          setNewPost({
                            ...newPost,
                            transports: transport,
                          });
                          // console.log([...transports, e.target.value]);
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        <i className={transport.icon}></i>
                      </label>
                      <div className="validation"></div>
                    </div>
                  ))}
              </div>
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
              rows="5"
              onChange={(e) =>
                setNewPost({ ...newPost, description: e.target.value })
              }
            ></textarea>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end p-2">
        <div className="col-1">
          <button className="btn btn-secondary" type="reset">
            Cancel
          </button>
        </div>
        <div className="col-1">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => validations()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
