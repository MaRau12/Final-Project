import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CircleFlag } from "react-circle-flags";

import { Link } from "react-router-dom";

import "../../styles/countriesScroll.css";

export const CountriesScroll = () => {
  const { store } = useContext(Context);
  const countries = store.countries.countries;

  return (
    <div className="m-5">
      <div className="scroll">
        {countries &&
          countries.map((country) => (
            <div className="flag me-3 text-center" key={country.id}>
              <Link to={"/country"}>
                <CircleFlag countryCode={country.code.toLowerCase()} />
              </Link>
              <p className="country-name mx-auto">{country.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
