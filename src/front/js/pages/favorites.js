import React from "react";
import { Card } from "../component/cardList";

export const Favorite = () => {
  return (
    <>
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading p-4">Favorite</h1>
          <p className="lead text-muted">
            Something short and leading about the collection of user photos.
          </p>
        </div>
      </section>

      <div className="Container bg-light py-5">
        <CardList />
      </div>
    </>
  );
};
