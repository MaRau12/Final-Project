import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Album } from "./pages/album";
import { Country } from "./pages/country";
import { Favorite } from "./pages/favorites";
import { NewPost } from "./pages/newPost";
import { Notification } from "./pages/notification";
import { SearchResult } from "./pages/searchResult";
import { UserProfile } from "./pages/userProfile";
import { UserSettings } from "./pages/userSettings";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { ForgotPassword } from "./pages/forgotPassword";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Album />} path="/album" />
            <Route element={<Country />} path="/country" />
            <Route element={<Favorite />} path="/favorites" />
            <Route element={<NewPost />} path="/newpost" />
            <Route element={<Notification />} path="/notification" />
            <Route element={<SearchResult />} path="/searchresult" />
            <Route element={<UserProfile />} path="/userprofile" />
            <Route element={<UserSettings />} path="/usersettings" />
            <Route element={<Register />} path="/register" />
            <Route element={<Login />} path="/login" />
            <Route element={<ForgotPassword />} path="/forgotpassword" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
