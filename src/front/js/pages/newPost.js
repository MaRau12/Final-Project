import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";
import { Map } from "../component/map";

export const NewPost = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState(null);

  const [files, setFiles] = useState(null);

  const [newPost, setNewPost] = useState({
    title: "",
    post_image_url: null,
    country: "",
    from_location: {},
    to_location: {},
    trip_duration: 0,
    price: 0,
    transports: [],
    description: "",
  });

  function setFrom(city) {
    setNewPost({ ...newPost, from_location: city });
  }
  function setTo(city) {
    setNewPost({ ...newPost, to_location: city });
  }

  async function post() {
    let body = new FormData();
    if (files != null) {
      body.append("post_image", files[0]);
    }
    body.append("user_data", JSON.stringify(newPost));
    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/posts", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: body,
      });
      if (response.ok) {
        console.log("success");
        actions.getAllPosts();
        actions.getCurrentUser();
        navigate("/userprofile");
      } else {
        setError("Error occurred during post request");
      }
    } catch (error) {
      setError("Error occurred during post request");
    }
  }

  function validations() {
    const errors = {};

    if (newPost.title.trim() === "" || newPost.title.trim().length < 5) {
      errors.title = " Title must have at least 5 characters";
    }
    if (!newPost.country) {
      errors.country = " Please select a country";
    }
    if (
      !newPost.trip_duration ||
      isNaN(newPost.trip_duration) ||
      newPost.trip_duration <= 0
    ) {
      errors.trip_duration = " Please enter a valid duration";
    }
    if (!newPost.price || isNaN(newPost.price) || newPost.price <= 0) {
      errors.price = " Please enter a valid price";
    }
    if (newPost.transports.length === 0) {
      errors.transports = " Please select a transport method";
    }
    if (
      newPost.description.trim() === "" ||
      newPost.description.trim().length < 20
    ) {
      errors.description = " Description must have at least 20 characters";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      post();
    }
  }

  const navigateBack = useNavigate();
  const goBack = () => {
    navigateBack(-1);
  };

  return (
    <div className="img-bg">
      <div className="container color-bg-secondary-trans">
        <div className="row mb-3 pt-3">
          <div>
            <button type="button" className="slide p-2" onClick={goBack}>
              Go Back
            </button>
          </div>
        </div>

        <div className="row justify-content-center mb-3">
          <div className="title col-8 col-sm-8 col-md-8 text-center">
            <h1 className="color-primary m-0">New post</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 p-3">
            <div className="row">
              <label htmlFor="title" className="form-label">
                Title
              </label>
            </div>
            <div className="row">
              <input
                className="fake-input m-0"
                type="text"
                placeholder="My amazing trip!"
                onChange={(e) => {
                  setNewPost({ ...newPost, title: e.target.value });
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    title: "",
                  }));
                }}
              />
            </div>
            {validationErrors.title && (
              <div className="text-error">
                <i className="fa-solid fa-triangle-exclamation"></i>
                {validationErrors.title}
              </div>
            )}
          </div>

          <div className="col-md-4 p-3">
            <div className="row">
              <label htmlFor="country" className="form-label">
                Country
              </label>
            </div>
            <div className="row">
              <select
                className="fake-input m-0"
                onChange={(e) => {
                  setNewPost({ ...newPost, country: e.target.value });
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    country: "",
                  }));
                }}
              >
                {store.countries &&
                  store.countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>
            {validationErrors.country && (
              <div className="text-error">
                <i className="fa-solid fa-triangle-exclamation"></i>
                {validationErrors.country}
              </div>
            )}
          </div>

          {/*  --------- MAP --------- */}
          <div className="row justify-content-center mb-3">
            {newPost.country && (
              <Map newPost={newPost} setFrom={setFrom} setTo={setTo} />
            )}
          </div>

          <div className="row justify-content-center mb-3">
            <div className="col-md-3 p-3">
              <div className="row">
                <label className="form-label">Trip duration</label>
              </div>
              <div className="row">
                <input
                  type="text"
                  className="fake-input m-0"
                  placeholder="hrs."
                  onChange={(e) => {
                    setNewPost({ ...newPost, trip_duration: e.target.value });
                    setValidationErrors((prevErrors) => ({
                      ...prevErrors,
                      trip_duration: "",
                    }));
                  }}
                />
              </div>
              {validationErrors.trip_duration && (
                <div className="text-error">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {validationErrors.trip_duration}
                </div>
              )}
            </div>

            <div className="col-md-3 p-3">
              <div className="row">
                <label className="form-label">Price</label>
              </div>
              <div className="row">
                <input
                  type="text"
                  className="fake-input m-0"
                  placeholder="€"
                  onChange={(e) => {
                    setNewPost({ ...newPost, price: e.target.value });
                    setValidationErrors((prevErrors) => ({
                      ...prevErrors,
                      price: "",
                    }));
                  }}
                />
              </div>
              {validationErrors.price && (
                <div className="text-error">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {validationErrors.price}
                </div>
              )}
            </div>

            <div className="col-md-8 col-lg-7 p-3">
              <div className="row">
                <label className="form-label">Transports</label>
              </div>
              <div className="row d-flex justify-content-center">
                {store.transports &&
                  store.transports.map((transport) => (
                    <div
                      key={transport.id}
                      className="form-check form-check-inline col-2 m-0 mt-3"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={transport.name}
                        onChange={(e) => {
                          setNewPost({
                            ...newPost,
                            transports: [...newPost.transports, transport],
                          });
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        <i className={transport.icon}></i>
                      </label>
                    </div>
                  ))}
              </div>
              {validationErrors.transports && (
                <div className="text-error text-center">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {validationErrors.transports}
                </div>
              )}
            </div>
          </div>

          <div className="col-10 col-md-6 col-lg-4">
            <div className="row text-center">
              <label className="form-label">Add picture</label>
            </div>
            <div className="row">
              <input
                type="file"
                id={"upload-button"}
                className="fake-input"
                onChange={(e) => setFiles(e.target.files)}
              />
            </div>
          </div>

          <div className="row justify-content-center mb-3">
            <div className="col-md-8 p-3">
              <div className="row">
                <label htmlFor="message" className="form-label">
                  Description
                </label>
              </div>
              <div className="row">
                <textarea
                  className="fake-input m-0"
                  rows="7"
                  onChange={(e) => {
                    setNewPost({ ...newPost, description: e.target.value });
                    setValidationErrors((prevErrors) => ({
                      ...prevErrors,
                      description: "",
                    }));
                  }}
                ></textarea>
                {validationErrors.description && (
                  <div className="text-error">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    {validationErrors.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="row justify-content-center mb-3">
            <div className="col-md-8">
              <div className="text-error">
                <i className="fa-solid fa-triangle-exclamation"></i>
                {error}
              </div>
            </div>
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col-3 col-sm-3 col-md-2 p-3">
            <Link to={"/userprofile"}>
              <button className="raise color-red">Delete</button>
            </Link>
          </div>
          <div className="col-3 col-sm-3 col-md-2 p-3">
            <button
              className="raise"
              type="submit"
              onClick={() => validations()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
