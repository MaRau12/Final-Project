import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

import { Jumbotron } from "../component/jumbotron";
import { Buttons } from "../component/buttons";
import { Card } from "../component/Card";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div>
      <Jumbotron />
      <Buttons />
      <div className="container">
        <div className="row row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-5 ">
          {store.posts &&
            store.posts.map((post) => <Card key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
};
