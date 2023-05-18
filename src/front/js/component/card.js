import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import { Heart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export const Card = ({ post }) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <div key={post.id} className="card h-100 shadow p-3 mb-5 bg-body rounded">
        <img
          src={rigoImage}
          className="card-img-top shadow bg-body rounded"
          atl=""
        />
        <div className="card-body">
          <h5 className="card-title text-truncate">{post.title}</h5>
          <p className="card-text">{post.description}</p>

          <div className="d-flex justify-content-between ">
            <Link to={"/tripdetails/" + post.id}>
              <button className="raise">More</button>
            </Link>
            {store.currentUser.favorites
              .map((x) => {
                return x.post.id;
              })
              .includes(post.id) ? (
              <Heart
                onClick={() => actions.addFavorite(post.id)}
                size={35}
                color="#eb0f0f"
                weight="fill"
              />
            ) : (
              <Heart onClick={() => actions.addFavorite(post.id)} size={35} />
            )}
          </div>

          <div>
            {store.currentUser.id == post.user_id ? (
              <button
                className="btn btn-outline-danger rounded-circle border border-0 mp-0"
                data-bs-toggle="modal"
                data-bs-target={"#staticBackdrop" + post.id}
                onClick={() => setShowModal(true)}
              >
                x
              </button>
            ) : (
              ""
            )}
            <div
              className="modal fade"
              id={"staticBackdrop" + post.id}
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="cardModalLabel">
                      Are you sure you want to delete this post permanentely?
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      data-bs-dismiss="modal"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => actions.deletePost(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
