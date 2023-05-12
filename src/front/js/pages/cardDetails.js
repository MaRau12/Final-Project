import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CardDetails = (post) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return <h1>Card details</h1>;
};
