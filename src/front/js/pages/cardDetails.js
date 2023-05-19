import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Marker, Polyline } from "@react-google-maps/api";

import { Context } from "../store/appContext";
import { Comments } from "../component/comments";
import posts from "../../img/posts.jpg";

import "../../styles/cardDetails.css";

export const CardDetails = () => {
  const { store } = useContext(Context);
  const params = useParams();

  const post = store.posts.filter((post) => post.id == params.id)[0];

  const [userName, setUserName] = useState("");

  const mapStyle = {
    containerStyle: {
      height: "100%",
      width: "100%",
      position: "relative",
      overflow: "auto",
    },
    lineOptions: {
      strokeColor: "blue",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "blue",
      fillOpacity: 0.35,
      clickable: false,
      draggable: false,
      editable: true,
      visible: true,
      radius: 30000,
      zIndex: 1,
    },
  };

  const pointers = [
    {
      center: {
        lat: post.from_location.latitude,
        lng: post.from_location.longitude,
      },
    },
    {
      path: [
        {
          lat: post.from_location.latitude,
          lng: post.from_location.longitude,
        },
        {
          lat: post.to_location.latitude,
          lng: post.to_location.longitude,
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(
          process.env.BACKEND_URL + `/api/users/${post.user_id}`
        );
        const data = await response.json();
        const name =
          data.user.user_name.charAt(0).toUpperCase() +
          data.user.user_name.slice(1);
        setUserName(name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, [post.user_id]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {store.posts && (
        <div className="img-bg">
          <div className="container primary">
            <div className="row mb-3 pt-3">
              <div className="col-2">
                <button type="button" className="slide p-2" onClick={goBack}>
                  Go Back
                </button>
              </div>
            </div>

            <div className="row justify-content-center mb-5">
              <div className="col-6">
                <img src={posts} className="card-img-top" atl="" />
              </div>

              <div className="col-6">
                <LoadScript googleMapsApiKey="AIzaSyA2oagV6knZYw4D3oN41bpT6dRB16ytOr0">
                  <GoogleMap
                    mapContainerStyle={mapStyle.containerStyle}
                    center={pointers[0].center}
                    zoom={6}
                  >
                    <Marker position={pointers[1].path[0]} />
                    <Marker position={pointers[1].path[1]} />
                    <Polyline
                      path={pointers[1].path}
                      options={mapStyle.lineOptions}
                    />
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>

            <div className="row justify-content-center mb-3">
              <div className="title col-8 text-center">
                <h1 className="color-primary m-0">
                  {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                </h1>
              </div>
            </div>

            <div className="row justify-content-center mb-3">
              <div className="col-4">
                <div className="box box-primary w-70 align-items-stretch d-flex pe-3 pb-1">
                  {post.transports.map((transport) => (
                    <div
                      key={transport.id}
                      className="icon icon-left icon-primary d-flex align-items-center justify-content-center me-1"
                    >
                      <i className={transport.icon}></i>
                    </div>
                  ))}
                  <div className="text text-right">
                    <h4>{post.transports.length}</h4>
                    <span>Transports</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center mb-3">
              <div className="col-2">
                <div className="box box-white w-70 align-items-stretch d-flex pe-3 pb-1">
                  <div className="icon icon-left icon-quarternary d-flex align-items-center justify-content-center">
                    <i className="fa-solid fa-heart"></i>
                  </div>
                  <div className="text text-right">
                    <h4>{post.likes}</h4>
                    <span>Likes</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="box box-white w-70 align-items-stretch d-flex pe-3 pb-1">
                  <div className="icon icon-left icon-tertiary d-flex align-items-center justify-content-center">
                    <i className="fa-solid fa-euro-sign"></i>
                  </div>
                  <div className="text text-right">
                    <h4>{post.price}</h4>
                    <span>Price</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="box box-white w-70 align-items-stretch d-flex pe-3 pb-1">
                  <div className="icon icon-left icon-secondary d-flex align-items-center justify-content-center">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <div className="text text-right">
                    <h4>{post.trip_duration}</h4>
                    <span>Hours</span>
                  </div>
                </div>
              </div>
            </div>


            <div className="row justify-content-center">
              <div className="fake-button col-6 mb-5">
                <div className="row mb-2">
                  <span className="color-primary">@ {userName}</span>
                </div>
                <div className="row text-center">
                  <p className="mb-0">{post.description}</p>
                </div>
              </div>
            </div>

            {/* <div className="row justify-content-center">
              <Comments />
            </div> */}

          </div>
        </div>
      )}
    </>
  );
};
