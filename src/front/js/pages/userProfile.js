import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";

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
        <p className="text-center">User name</p>
      </div>
      <div className="row justify-content-md-center">
        <img
          src={rigoImage}
          className="card-img-top"
          style={{ width: "16rem" }}
          atl=""
        />
        <img
          src={rigoImage}
          className="card-img-top"
          style={{ width: "16rem" }}
          atl=""
        />
        <img
          src={rigoImage}
          className="card-img-top"
          style={{ width: "16rem" }}
          atl=""
        />
      </div>
    </div>
  );
};
