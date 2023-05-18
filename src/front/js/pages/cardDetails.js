import React, { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/cardDetails.css";

export const CardDetails = () => {
  const { store } = useContext(Context);
  const params = useParams();
  const post = store.posts.filter((post) => post.id == params.id)[0];
  console.log(post);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {store.posts && (
        <div className="container bg-light">
          <button type="button" className="box box-primary" onClick={goBack}>
            Back
          </button>
          <div className="row">
            <div className="col-6">
              <img src={rigoImage} className="card-img-top" atl="" />
            </div>
            <div className="col-6">
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              <div className="col-8 mb-3">
                <div className="box box-primary w-100 align-items-stretch d-flex pe-3">
                  {post.transports.map((transport) => (
                    <div class="icon icon-left d-flex align-items-center justify-content-center">
                      <i class={transport.icon}></i>
                    </div>
                  ))}
                  <div class="text text-right">
                    <h4>{post.transports.length}</h4>
                    <span>Transports</span>
                  </div>
                </div>
              </div>
              <div className="col-5 mb-3">
                <div className="box box-white w-100 align-items-stretch d-flex pe-3">
                  <div class="icon icon-left icon-secondary d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-clock"></i>
                  </div>
                  <div class="text text-right">
                    <h4>{post.trip_duration}</h4>
                    <span>Hours</span>
                  </div>
                </div>
              </div>
              <div className="col-5 mb-3">
                <div className="box box-white w-100 align-items-stretch d-flex pe-3">
                  <div class="icon icon-left icon-tertiary d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-euro-sign"></i>
                  </div>
                  <div class="text text-right">
                    <h4>{post.price}</h4>
                    <span>Price</span>
                  </div>
                </div>
              </div>
              <div className="col-5 mb-3">
                <div className="box box-white w-100 align-items-stretch d-flex pe-3">
                  <div class="icon icon-left icon-quarternary d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-heart"></i>
                  </div>
                  <div class="text text-right">
                    <h4>{post.likes}</h4>
                    <span>Likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
