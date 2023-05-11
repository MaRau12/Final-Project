import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

import { CountriesScroll } from "../component/countriesScroll";
import { CardList } from "../component/cardList";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div>
      <CountriesScroll />
      <CardList cardItems={store.posts} />
    </div>
  );
};
