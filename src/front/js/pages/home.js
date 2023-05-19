import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

import { Jumbotron } from "../component/jumbotron";
import { Buttons } from "../component/buttons";
import { Card } from "../component/card";

import "../../styles/home.css";


export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div>
      <Jumbotron />
      <div className="container bg-light bg-gradient rounded">
        <div className="row row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-5 h-100 ">
          {store.posts &&
            store.posts.map((post) => <Card key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
};
