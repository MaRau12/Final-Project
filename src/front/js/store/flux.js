import { useNavigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      posts: [],
      currentUserPosts: null,
      userPosts: null,
      user: [],
      currentUser: { favorites: [] },
      favorites: [],
      countries: [],
      cities: [],
      transports: [],
      searchResults: [],
    },

    actions: {
      getCurrentUser: async () => {
        const token = sessionStorage.getItem("token");
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(
          process.env.BACKEND_URL + "/api/current_user",
          options
        );
        const data = await response.json();
        if (response.ok) {
          setStore({ currentUser: data });
          setStore({ currentUserPosts: data.post });
          console.log("current user found");
          console.log("current user posts:", data.post);
        }
      },
      getAllCountries: async () => {
        const response = await fetch(
          process.env.BACKEND_URL + "/api/countries",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        await setStore({ countries: data.countries });
      },

      getAllCities: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/cities", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        await setStore({ cities: data.cities });
      },

      getTransports: async () => {
        const response = await fetch(
          process.env.BACKEND_URL + "/api/transports",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        await setStore({ transports: data.data });
      },
      getAllPosts: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/posts");
        const data = await response.json();
        setStore({ posts: data.posts });
      },
      createNewPost: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
        if (response.ok) {
          await getAllPostsByUserId();
        }
      },
      deletePost: async (postId) => {
        const response = await fetch(
          process.env.BACKEND_URL + "/api/posts/" + postId,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          await getAllPostsByUserId();
        }
      },
      editPost: async (editedPost) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/posts", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedPost),
        });
        if (response.ok) {
          await getAllPostsByUserId();
        }
      },
      getAllPostsByUserId: async () => {
        const token = sessionStorage.getItem("token");
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
        const response = await fetch(
          process.env.BACKEND_URL + "/api/posts_by_user_id"
        );
        const data = await response.json();
        setStore({ userPosts: data.posts });
        console.log("fetchUserPosts", data);
      },

      setSearchResults: (result) => {
        setStore({ searchResults: result });
      },

      addFavorite: async (postId) => {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          process.env.BACKEND_URL + "/api/add-to-favorites/" + postId,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postId),
          }
        );
        if (response.ok) {
          getActions().getCurrentUser();
        }
      },
    },
  };
};

export default getState;
