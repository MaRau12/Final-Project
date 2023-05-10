import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";

import { Heart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export const CardList = (props) => {
  return (
    <div className="container">
      <div className="row row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-5 ">
        {props.cardItems.map((item) => {
          return (
            <div className="col ">
              <div key={item.id} className="card">
                <img src={rigoImage} className="card-img-top" atl="" />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <div className="d-flex justify-content-between">
                    <Link to="/searchresult">
                      <a href="#" className="btn btn-primary">
                        Learn More!
                      </a>
                    </Link>
                    <Heart className="heart" size={35} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
