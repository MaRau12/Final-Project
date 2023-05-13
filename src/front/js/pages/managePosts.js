import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg"
import posts from "../../img/posts.jpg"
import album from "../../img/album.jpg";
import { Heart } from "@phosphor-icons/react";
import { Card } from "../component/Card.js";

export const ManagePosts = () => {

    const { store, actions } = useContext(Context);

    return (
        store.currentUser ?
        <div className="Container">
            <div className="row row cols-4">
               <div className="col">
                your posts
               </div>
               <div className="row row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-5 m-5">
             {store.currentUser.post &&
             store.currentUser.post.map((post) => (
             <Card key={post.id} post={post} />
              ))}
      </div>
        </div>
        </div>

       : "Not allowed" )
    
}