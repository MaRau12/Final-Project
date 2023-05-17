import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CircleFlag } from "react-circle-flags";

import { Link } from "react-router-dom";

export const CountriesScroll = () => {
  const { store } = useContext(Context);
  const countries = store.countries;

  return (
    <div className="scroll d-flex justify-content-center my-3">
      {countries &&
        countries.map((country) => {
          if (
            store.posts
              .map((x) => x.from_location.country)
              .concat(store.posts.map((x) => x.to_location.country))
              .some((y) => y == country.name)
          ) {
            return (
              <div className="flag me-1 mb-3 text-center" key={country.id}>
                <Link to={"/country"}>
                  <CircleFlag countryCode={country.code.toLowerCase()} />
                </Link>
                {/* <p className="country-name mx-auto">{country.name}</p> */}
              </div>
            );
          }
        })}
    </div>
  );
};
