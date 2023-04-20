import React, { useContext } from "react";
import { Country } from "../component/country";
import { Card } from "../component/card";

export const Home = () => {
  return (
    <div>
      <Country />
      <Card />
    </div>
  );
};
