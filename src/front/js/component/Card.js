import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import { Heart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export const Card = ({ post }) => {
  const { store, actions } = useContext(Context);
  // console.log(post);
  return (
    <div key={post.id} className="card h-100">
      <img src={rigoImage} className="card-img-top" atl="" />
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.description}</p>
        <div className="d-flex justify-content-between">
          <Link to={"/tripdetails/" + post.id} className="btn btn-primary">
            See more!
          </Link>
          <Heart
            className={
              store.currentUser.favorites
                .map((x) => {
                  return x.post_id;
                })
                .includes(post.id)
                ? "heart text-danger"
                : "heart"
            }
            onClick={() => actions.addFavorite(post.id)}
            size={35}
          />
          {/* {post.post.id == currentUser.} */}
        </div>
      </div>
    </div>
  );
};
