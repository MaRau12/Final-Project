import React from "react";
import album from "../../img/album.jpg";
import posts from "../../img/posts.jpg";
import deepSea from "../../img/deepSea.jpg";
import desert from "../../img/desert.jpg";
import { Card } from "../component/card";

export const Favorite = () => {
  return (
    <>
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Favorite</h1>
          <p className="lead text-muted">
            Something short and leading about the collection of user photos.
          </p>
        </div>
      </section>

      <div className="Container bg-light py-5">
        <Card />
      </div>
    </>
  );
};
