import { useContext } from "react";
import { Context } from "../store/appContext";

import { CountriesScroll } from "../component/countriesScroll";
import { CardList } from "../component/cardList";

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
