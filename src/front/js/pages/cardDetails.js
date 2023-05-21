import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Marker, Polyline } from "@react-google-maps/api";

import { Context } from "../store/appContext";
import { Jumbotron } from "../component/jumbotron";
import { Comments } from "../component/comments";

export const CardDetails = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [post, setPost] = useState();
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const mapStyle = {
    containerStyle: {
      height: "100%",
      width: "100%",
      position: "relative",
      overflow: "visible",
    },
    lineOptions: {
      strokeColor: "blue",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "blue",
      fillOpacity: 0.35,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
      radius: 30000,
      zIndex: 1,
    },
  };
  const pointers = post
    ? [
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
      ]
    : [];

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

    setPost(store.posts.filter((post) => post.id == params.id)[0]);
    if (post) {
      fetchUserName();
    }
  }, [post, params.id, store.posts]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const postComment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/comments", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: post.id,
          date: new Date().toISOString(),
          comment: comment,
        }),
      });
      if (response.ok) {
        // Clear the comment input field
        setComment("");
        setError(null);
        actions.getAllPosts();
      } else {
        setError("An error occurred while posting the comment.");
        console.error(error);
      }
    } catch (error) {
      // Handle the error (e.g., display error message)
      setError("An error occurred while posting the comment.");
      console.error(error);
    }
  };

  return (
    <>
      <Jumbotron />
      {post && (
        <div className="container bg-light bg-gradient rounded">
          <div className="row mb-3 pt-3">
            <div className="">
              <button type="button" className="slide p-2" onClick={goBack}>
                Go Back
              </button>
            </div>
          </div>

          <div className="row justify-content-center mb-5">
            <div className="col-6">
              <img
                src={
                  post.post_image_url
                    ? post.post_image_url
                    : "https://placehold.co/500x500"
                }
                className="card-img-top"
                atl=""
              />
            </div>
            <div className="col-6 col-sm-6 col-md-6">
              <LoadScript
                googleMapsApiKey="AIzaSyA2oagV6knZYw4D3oN41bpT6dRB16ytOr0"
                containerStyle={{
                  height: "100%",
                  width: "100%",
                  overflow: "visible",
                }}
              >
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

          <div className="post-details row color-bg-secondary color-white py-5 mb-5">
            <div className="row justify-content-center mb-3">
              <div className="title col-8 text-center">
                <h1 className="color-primary m-0">
                  {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                </h1>
              </div>
            </div>

            <div className="row justify-content-center mb-3">
              <div className="col-7 col-sm-7 col-md-5">
                <div className="box w-70 align-items-stretch d-flex pe-3 pb-1">
                  {post.transports.map((transport) => (
                    <div
                      key={transport.id}
                      className="icon icon-left color-blue d-flex align-items-center justify-content-center me-1"
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
              <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                <div className="box box-white w-70 align-items-stretch d-flex pe-3 pb-1">
                  <div className="icon icon-left color-red d-flex align-items-center justify-content-center">
                    <i className="fa-solid fa-heart"></i>
                  </div>
                  <div className="text text-right">
                    <h4>{post.likes}</h4>
                    <span>Likes</span>
                  </div>
                </div>
              </div>
              <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                <div className="box box-white w-70 align-items-stretch d-flex pe-3 pb-1">
                  <div className="icon icon-left color-green d-flex align-items-center justify-content-center">
                    <i className="fa-solid fa-euro-sign"></i>
                  </div>
                  <div className="text text-right">
                    <h4>{post.price}</h4>
                    <span>Price</span>
                  </div>
                </div>
              </div>
              <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                <div className="box box-white w-70 align-items-stretch d-flex pe-3 pb-1">
                  <div className="icon icon-left color-orange d-flex align-items-center justify-content-center">
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
              <div className="fake-button col-8 col-md-8">
                <div className="row mb-2">
                  <span className="color-primary">@ {userName}</span>
                </div>
                <div className="row text-center">
                  <p className="mb-0">{post.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center pb-5">
            <div className="comments-container col-8 col-md-8 p-3 bg-body">
              <div className="title text-center mb-2">
                <h2 className="color-primary m-0">Comments</h2>
              </div>
              <div
                className="comments-scroll"
                style={{ maxHeight: "300px", overflow: "auto" }}
              >
                {post.comments &&
                  post.comments.map((comment) => (
                    <Comments key={comment.id} comments={comment} />
                  ))}
              </div>
            </div>
          </div>

          {store.currentUser.id && (
            <div className="row justify-content-center pb-5">
              <div className="col-8 color-bg-primary rounded p-3">
                <div className="row align-items-center p-0">
                  <div className="col-md-9">
                    <div className="comment-text">
                      <textarea
                        className="col-12 comment-box p-3"
                        value={comment}
                        rows={5}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="comment-image text-center col-md-3">
                    <img
                      src={
                        store.currentUser.profile_image_url != null
                          ? store.currentUser.profile_image_url
                          : "https://placehold.co/500x500"
                      }
                    />
                  </div>
                </div>
                {error && <div>{error}</div>}
                <div className="row px-3 pt-2">
                  <button className="m-0" onClick={postComment}>
                    Post Your Comment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
