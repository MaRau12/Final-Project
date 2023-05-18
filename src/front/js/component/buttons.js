import React from "react";
import "../../styles/home.css";

export const Buttons = () => {
  return (
    <>
      <div className="buttons d-flex justify-content-center">
        <button className="fill">Create</button>
        <button className="pulse">Pulse</button>
        <button className="close">Back</button>
        <button className="raise">Raise</button>
        <button className="up">Fill Up</button>
        <button className="slide">More</button>
        <button className="offset">Offset</button>
      </div>
    </>
  );
};
