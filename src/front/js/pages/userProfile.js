import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg"
import posts from "../../img/posts.jpg"
import album from "../../img/album.jpg";


export const UserProfile = () => {
  
  const { store, actions } = useContext(Context);
  
  /*useEffect(()=>{
    actions.getAllPostsByUserId()
  },[]) */

  console.log("profile",store.currentUser)
  console.log("user_posts", store.userPosts)

  return (
    store.currentUser? 
    <div className="Container">
      <div>
        <div className="row justify-content-md-center">
          <div
            className="ratio ratio-1x1 rounded-circle overflow-hidden p-5 m-5   "
            style={{ width: "14rem" }}
          >
            <img src={rigoImage} className="card-img-top rounded-circle" alt="" />
          </div>
        </div>
        <h3 className="text-center">{store.currentUser.user_name}</h3>
        <h3 className="text-center">{store.currentUser.full_name}</h3>
        <h3 className="text-center">{store.currentUser.email}</h3>
        <h3 className="text-center">{store.currentUser.description}</h3>
      </div>
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
  :"");
};
