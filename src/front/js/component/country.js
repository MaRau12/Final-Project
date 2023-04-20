import React, { useState } from "react";
import { CircleFlag } from "react-circle-flags";

import { Link } from "react-router-dom";

export const Country = () => {
  const [character, setCharacters] = useState([
    "es",
    "ca",
    "it",
    "pt",
    "na",
    "br",
  ]);
  return (
    <div className="container">
      <div className="row row-cols-6 g-5 p-5">
        {character.map((item, index) => {
          return (
            <div className="col">
              <Link to={"/country"}>
                <CircleFlag countryCode={item} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
