import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card.js";

export const ManagePosts = () => {
  const { store, actions } = useContext(Context);

  return store.currentUser ? (
    <div className="Container">
      <div className="row row cols-4">
        <div className="col">your posts</div>
        <div className="row row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-5 m-5">
          {store.currentUser.post &&
            store.currentUser.post.map((post) => (
              <Card key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
  ) : (
    "Not allowed"
  );
};
