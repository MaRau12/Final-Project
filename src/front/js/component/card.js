import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Heart, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export const Card = ({ post }) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <div key={post.id} className="card h-100 shadow mb-5 bg-body rounded">
        <img
          src={
            post.post_image_url
              ? post.post_image_url
              : "https://placehold.co/500x500"
          }
          className="card-img-top position-relative"
          atl=""
        />
        <div>
          {store.currentUser.id == post.user_id ? (
            <div>
              <button
                className="btn btn-outline-danger rounded-circle border border-0 position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2"
                data-bs-toggle="modal"
                data-bs-target={"#staticBackdrop" + post.id}
              >
                x
              </button>
              <div
                className="modal"
                id={"staticBackdrop" + post.id}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
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
                        onClick={async () => {
                          if (await actions.deletePost(post.id)) {
                            const modalElement = document.querySelector(
                              "#staticBackdrop" + post.id
                            );
                            const modalInstance =
                              bootstrap.Modal.getInstance(modalElement);
                            modalInstance.hide();
                            actions.getCurrentUser();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="card-body">
          <h5 className="card-title text-truncate">{post.title}</h5>
          <p className="card-text">{post.description}</p>
        </div>
        <div className="card-footer">
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
        </div>
      </div>
    </div>
  );
};
