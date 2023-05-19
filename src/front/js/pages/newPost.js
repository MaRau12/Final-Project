import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";
import { Map } from "../component/map";

export const NewPost = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [validationErrors, setValidationErrors] = useState({});
  const [files, setFiles] = useState(null);
  const [preView, setPreview] = useState(null);

  const [newPost, setNewPost] = useState({
    title: "",
    country: "",
    from_location: {},
    to_location: {},
    trip_duration: 0,
    price: 0,
    transports: [],
    description: "",
  });

  useEffect(() => {
    // create the preview
    if (files != null && files.length > 0) {
      const objectUrl = URL.createObjectURL(files[0]);
      setPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [files]);

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
    const response = await fetch(process.env.BACKEND_URL + "/api/posts", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: body,
    });
    if (response.ok) {
      console.log("success");
      navigate("/userprofile");
    }
  }

  function validations() {
    const errors = {};

    if (newPost.title.trim() === "" || newPost.title.trim().length < 5) {
      errors.title = "Title must have at least 5 characters";
    }
    if (!newPost.country) {
      errors.country = "Please select a country";
    }
    if (
      !newPost.trip_duration ||
      isNaN(newPost.trip_duration) ||
      newPost.trip_duration <= 0
    ) {
      errors.trip_duration = "Please enter a valid duration";
    }
    if (!newPost.price || isNaN(newPost.price) || newPost.price <= 0) {
      errors.price = "Please enter a valid price";
    }
    if (
      newPost.description.trim() === "" ||
      newPost.description.trim().length < 20
    ) {
      errors.description = "Description must have at least 5 characters";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      post();
    }
  }

  return (
    <div className="text-center">
      <div className="d-flex justify-content-center border-bottom mt-3 p-3 ">
        <i className="fa-solid fa-circle-plus fa-2xl mp-0" />
        <h3 className="ms-3">New post</h3>
      </div>

      <div className="bg-light border-botto_locationm p-3">
        <div className="row g-3 justify-content-center mb-3">
          <div className="col-md-12">
            <img
              className="img-fluid img-thumbnail"
              src={preView != null ? preView : "https://placehold.co/500x500"}
              alt="..."
              width={500}
              height={500}
            />

            <div className="mb-3">
              <input
                type="file"
                id={"upload-button"}
                style={{ display: "none" }}
                onChange={(e) => setFiles(e.target.files)}
              />
              <label htmlFor={"upload-button"}>
                <i
                  className="fa-solid fa-circle-plus fa-2xl mp-0"
                  style={{ marginRight: 10 }}
                />
              </label>
            </div>
          </div>

          <div className="col-md-5">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              className="form-control"
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
            {validationErrors.title && (
              <div className="text-danger">{validationErrors.title}</div>
            )}
          </div>

          <div className="col-md-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              className="form-select"
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
            {validationErrors.country && (
              <div className="text-danger">{validationErrors.country}</div>
            )}
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
                onChange={(e) => {
                  setNewPost({ ...newPost, trip_duration: e.target.value });
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    trip_duration: "",
                  }));
                }}
              />
              <span className="input-group-text">hrs</span>
            </div>
            {validationErrors.trip_duration && (
              <div className="text-danger">
                {validationErrors.trip_duration}
              </div>
            )}
          </div>
          <div className="col-md-2 col-sm-6">
            <label className="form-label">Price</label>
            <div className="input-group">
              <input
                type="test"
                className="form-control"
                onChange={(e) => {
                  setNewPost({ ...newPost, price: e.target.value });
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    price: "",
                  }));
                }}
              />
              <span className="input-group-text">€</span>
            </div>
            {validationErrors.price && (
              <div className="text-danger">{validationErrors.price}</div>
            )}
          </div>
          <div className="col-md-4">
            <label className="form-label">Transports</label>
            <div className="input-group d-flex rectangle justify-content-center rounded bg-light">
              {store.transports &&
                store.transports.map((transport) => (
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
                          transports: [...newPost.transports, transport],
                        });
                      }}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      <i className={transport.icon}></i>
                    </label>
                    {validationErrors.transports && (
                      <div className="text-danger">{error.transports}</div>
                    )}
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
              onChange={(e) => {
                setNewPost({ ...newPost, description: e.target.value });
                setValidationErrors((prevErrors) => ({
                  ...prevErrors,
                  description: "",
                }));
              }}
            ></textarea>
            {validationErrors.description && (
              <div className="text-danger">{validationErrors.description}</div>
            )}
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
