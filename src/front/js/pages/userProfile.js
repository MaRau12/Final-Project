import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import posts from "../../img/posts.jpg";
import album from "../../img/album.jpg";
import { Heart } from "@phosphor-icons/react";
import { Card } from "../component/Card";

export const UserProfile = () => {
  const { store, actions } = useContext(Context);


  console.log("profile", store.currentUser)
  console.log("user_posts", store.currentUserPosts)
  console.log("fav:", store.favorites)

  return (
    store.currentUser ?
   ( <div>
      <div className="Container">
        <div>
          <div className="row m-5">

            <div className="col-md-4 float-start">

              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div
                  className="ratio ratio-1x1 rounded-circle overflow-hidden p-5 mx-auto"
                  style={{ width: "14rem" }}>
                  <img src={rigoImage} className="card-img-top rounded-circle" alt="" />
                </div>
                <div className="card-title text-center p-3">
                  <h3 >{store.currentUser.user_name}</h3>
                  <p>{store.currentUser.description}</p>
                </div>
                <div className="card-body p-3">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Name: {store.currentUser.full_name}</li>
                    <li className="list-group-item">Email: {store.currentUser.email}</li>
                    <li className="list-group-item">Country: {store.currentUser.country}</li>
                    <li className="list-group-item">City: {store.currentUser.city}</li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
          <div className="col">
            {store.currentUser.favorites &&
              store.currentUser.favorites.map((favorite) => (
                <Card key={favorite.id} post={favorite.post} />
              ))}
            {/* <Card post={store.currentUser.favorites} /> */}
          </div>
        </div>
      </div>
      <div className="row row-cols-6 p-5 bg-gray">
        <h3>Your Posts</h3>
        <Link to="/newpost">
          <button className="btn btn-outline-warning rounded-circle border border-0 mp-0">
            <i className="fa-solid fa-circle-plus fa-2xl mp-0"></i>
          </button>
        </Link>
      </div>
      {store.currentUser.post &&
        store.currentUser.post.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      <div className="row justify-content-md-center p-5">
        <img
          src={posts}
          className="card-img-top m-5"
          style={{ width: "16rem" }}
          atl=""
        />
        <img
          src={album}
          className="card-img-top m-5"
          style={{ width: "16rem" }}
          atl=""
        />
        <img
          src={rigoImage}
          className="card-img-top m-5"
          style={{ width: "16rem" }}
          atl=""
        />
      </div>
    </div>
    ) : ("")
    );
};

/*               <Link to="/newpost">
                  <button type="button" className="btn btn-success btn-lg">New Post</button>
              </Link>

             <Link to="/usersettings">
              <button type="button" className="btn btn-primary btn-lg">Settings</button>
             </Link>
              */
