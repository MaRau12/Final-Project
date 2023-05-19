import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import posts from "../../img/posts.jpg";
import album from "../../img/album.jpg";
import { Card } from "../component/card";

export const UserProfile = () => {
  const { store, actions } = useContext(Context);
  const [preView, setPreview] = useState(null);

  return store.currentUser ? (
    <div className="container ">
      <div className="container bg-light ">
        <div className="row bg-white m-5 shadow p-3 mb-5 bg-body rounded">
          <div className="col-md-4 float-start ">
            <div
              className="ratio ratio-1x1 rounded-circle overflow-hidden p-5 mx-auto"
              style={{ width: "14rem" }}
            >
              <img
                src={
                  preView != null
                    ? preView
                    : store.currentUser.profile_image_url
                    ? store.currentUser.profile_image_url
                    : "https://placehold.co/200x200"
                }
                className="card-img-top rounded-circle"
                alt=""
              />
            </div>

            <h3>{store.currentUser.user_name}</h3>
            <p>{store.currentUser.description}</p>
          </div>
          <div className="col-4 p-3">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Name: {store.currentUser.full_name}
              </li>
              <li className="list-group-item">
                Email: {store.currentUser.email}
              </li>
              <li className="list-group-item">
                Country: {store.currentUser.country}
              </li>
              <li className="list-group-item">
                City: {store.currentUser.city}
              </li>
            </ul>
          </div>
          <div className="col-4 p-3">
            <h6>Album</h6>
            <Link to="/album">
              <img
                src={album}
                className="card-img-top "
                style={{ width: "12rem" }}
                atl=""
              />
            </Link>
          </div>
        </div>

        <div className="row p-5">
          <h3>Your favorites:</h3>
        </div>
        <div className="row row-cols-6 g-3 m-5">
          {store.currentUser.favorites &&
            store.currentUser.favorites.map((favorite) => (
              <Card key={favorite.id} post={favorite.post} />
            ))}
        </div>

        <div className="row p-5">
          <h3>Your Posts </h3>
          <Link to="/newpost">
            <button className="btn btn-outline-warning rounded-circle border border-0 mp-0">
              <i className="fa-solid fa-circle-plus fa-2xl mp-0"></i>
            </button>
          </Link>
        </div>
        <div className="row row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-5 m-5">
          {store.currentUser.post &&
            store.currentUser.post.map((post) => (
              <Card key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
