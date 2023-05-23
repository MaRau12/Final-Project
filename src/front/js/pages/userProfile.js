import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import posts from "../../img/posts.jpg";
import album from "../../img/album.jpg";
import deepSea from "../../img/deepSea.jpg";
import desert from "../../img/desert.jpg";

import { Card } from "../component/card";

export const UserProfile = () => {
  const { store, actions } = useContext(Context);
  const [preView, setPreview] = useState(null);

  return store.currentUser ? (
    <div className="container ">
      <div className="container bg-light py-1">
        <div className="row color-bg-primary m-5 shadow p-3 mb-5  rounded">
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
          </div>
          <div className="col-md-8">
            <div className="row  nametag ">
              <div className="col divider">
                <p>{store.currentUser.description}</p>
              </div>
              <div className="col">
                <ul className="list-group list-group-flush ">
                  <li className="list-groupt-item">
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
            </div>
          </div>
        </div>

        <div>
          {" "}
          {/* placeholder scroll for album Images*/}
          <div className="button">
            <Link to="/album"> Album</Link>
          </div>
          <div className="scroll d-flex justify-content-center my-3 overflow-auto">
            <img
              src={album}
              alt="..."
              className="img-thumbnail"
              style={{ width: "18rem" }}
            />
            <img
              src={posts}
              alt="..."
              className="img-thumbnail"
              style={{ width: "18rem" }}
            />
            <img
              src={desert}
              alt="..."
              className="img-thumbnail"
              style={{ width: "18rem" }}
            />
            <img
              src={deepSea}
              alt="..."
              className="img-thumbnail"
              style={{ width: "18rem" }}
            />
          </div>
        </div>

        <div className="row p-5">
          <h3>Your favorites:</h3>
        </div>
        <div className="row row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-5 h-100 ">
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
        <div className="row row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-5 h-100">
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

/*
              <ul className="list-group list-group-flush color-bg-primary">
              <li className="">
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
         
            <p>{store.currentUser.description}</p>
            */
