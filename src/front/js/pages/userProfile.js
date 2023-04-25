import React from "react";
import rigoImage from "../../img/rigo-baby.jpg"
import posts from "../../img/posts.jpg"
import album from "../../img/album.jpg";

export const UserProfile = () => {
  return (
    <div className="Container">
      <div>
        <div className="row justify-content-md-center">
          <div
            className="ratio ratio-1x1 rounded-circle overflow-hidden p-5 m-5   "
            style={{ width: "14rem" }}
          >
            <img src={rigoImage} class="card-img-top rounded-circle" alt="" />
          </div>
        </div>
        <h3 className="text-center">User name</h3>
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
  );
};
