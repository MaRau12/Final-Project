
import react from "react";
import { Country } from "../component/country";
import { Card } from "../component/card";

import React, { useContext } from "react";
import { Link } from "react-router-dom";


export const Home = () => {
  return (
   <div>
    <Country />
    <Card />
   </div>
  );
};
