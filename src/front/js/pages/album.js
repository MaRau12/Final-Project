import React from "react";
import album from "../../img/album.jpg";
import posts from "../../img/posts.jpg";
import deepSea from "../../img/deepSea.jpg";
import desert from "../../img/desert.jpg";

export const Album = () => {
  return (
    <>
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Album</h1>
          <p className="lead text-muted">
            Something short and leading about the collection of user photos.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="album bg-light">
          <div className="col ">
            <div className="row d-flex justify-content-around row-cols-4 p-5">
              <img
                src={album}
                alt="..."
                class="img-thumbnail"
                style={{ width: "18rem" }}
              />
              <img
                src={posts}
                alt="..."
                class="img-thumbnail"
                style={{ width: "18rem" }}
              />
              <img
                src={desert}
                alt="..."
                class="img-thumbnail"
                style={{ width: "18rem" }}
              />
              <img
                src={deepSea}
                alt="..."
                class="img-thumbnail"
                style={{ width: "18rem" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
