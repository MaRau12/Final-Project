import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/Card";

export const SearchResult = () => {
  const { store, actions } = useContext(Context);
  return (
    <div>
      <Card cardItems={store.searchResults}></Card>
      <h1>This is a Search Result Page</h1>
      {store.searchResults.map((item) => {
        return item.title;
      })}
    </div>
  );
};
