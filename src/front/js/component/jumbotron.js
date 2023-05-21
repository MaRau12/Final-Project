import React from "react";
import { CountriesScroll } from "./countriesScroll";

import "../../styles/home.css";

// import "../../styles/jumbotron.css";

export const Jumbotron = () => {
  return (
    <div className="jumbotron img-bg d-flex justify-content-center p-5 bg-body-tertiary">
      <div className="container text-center color-bg-jumbotron m-5 p-5">
        <h1 className="text-body-emphasis">
          Get Inspired to Travel and Explore
        </h1>
        <p className="lead">
          Discover the world through our travel blog, where we share captivating
          stories and insider tips for your next adventure.
        </p>
        <div className="col-10 mx-auto">
          <CountriesScroll />
        </div>
      </div>
    </div>
  );
};
