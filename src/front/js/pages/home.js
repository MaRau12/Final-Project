
import { useContext } from "react";
import { Context } from "../store/appContext";
import { CountriesScroll } from "../component/countriesScroll";
import { CardList } from "../component/cardList";

import { Country } from "../component/country";
import { Card } from "../component/card";


import React from "react";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div>
      <CountriesScroll />
      <CardList cardItems={store.posts} />
      <Card />
    </div>
  );
};
