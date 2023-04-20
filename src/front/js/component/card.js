import React, { useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import { Heart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export const Card = () => {
  const [character, setCharacters] = useState([
    "Lisbon : Horse beach",
    "Granada : Cascada de la Mona",
    "Lyon : Chapelle Saint-Vincent",
    "Certosa: Schröfwand ",
    "Dublin : Killruddery House & Gardens ",
    "Leipzig : Erholungspark Mondsee",
  ]);
  return (
    <div className="container">
      <div className="row row-cols-4 g-5">
        {character.map((item, index) => {
          return (
            <div className="col">
              <div key={index} className="card" style={{ width: "18rem" }}>
                <img src={rigoImage} className="card-img-top" atl="" />
                <div className="card-body">
                  <h5 className="card-title">{item}</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>

                  <Link to="/searchresult">
                    <a href="#" className="btn btn-primary">
                      Learn More!
                    </a>
                  </Link>
                  <Heart className="heart" size={32} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
