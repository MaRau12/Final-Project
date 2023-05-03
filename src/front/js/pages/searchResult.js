import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const SearchResult = () => {
    const {store, actions} = useContext(Context);
    return (
        <div>
            <h1>This is a Search Result Page</h1>
            {store.searchResults.map((item)=>{
                return item.title
            })}
        </div>
    )
}