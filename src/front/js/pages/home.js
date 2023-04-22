import { Country } from "../component/country";
import { Card } from "../component/card";

import React, { useContext } from "react";



export const Home = () => {
  return (
   <div>
    <Country />
    <Card />
   </div>
  );
};
