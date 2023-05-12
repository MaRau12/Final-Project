import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

import { CountriesScroll } from "../component/countriesScroll";
import { Card } from "../component/Card";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div>
      <CountriesScroll />

      <div className="container">
        <div className="row row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-5 ">
          {store.posts &&
            store.posts.map((post) => <Card key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
};
