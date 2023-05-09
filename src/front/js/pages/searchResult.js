import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { CardList } from "../component/cardList";

export const SearchResult = () => {
    const {store, actions} = useContext(Context);
    return (
        <div>
            <CardList cardItems={store.searchResults}></CardList>
            <h1>This is a Search Result Page</h1>
            {store.searchResults.map((item)=>{
                return item.title
            })}
            
        </div>
    )
}