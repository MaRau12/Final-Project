import React, { useContext } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="text-center mt-5">
      <ol>
        <li>
          <Link to={"/country"}>
            <a>Country</a>
          </Link>
        </li>

        <li>
          <Link to={"/album"}>
            <a>Album</a>
          </Link>
        </li>

        <li>
          <Link to={"/favorites"}>
            <a>Favorite</a>
          </Link>
        </li>

        <li>
          <Link to={"/newpost"}>
            <a>NewPost</a>
          </Link>
        </li>

        <li>
          <Link to={"/notification"}>
            <a>Notification</a>
          </Link>
        </li>

        <li>
          <Link to={"/searchresult"}>
            <a>SearchResult</a>
          </Link>
        </li>

        <li>
          <Link to={"/userprofile"}>
            <a>UserProfile</a>
          </Link>
        </li>

        <li>
          <Link to={"/usersettings"}>
            <a>UserSettings</a>
          </Link>
        </li>
      </ol>
    </div>
  );
};
