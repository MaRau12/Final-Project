const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      favorites: [],
    },
    actions: {
      createNewUser: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
      },
      getAllPosts: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/posts");
        const data = await response.json();
        setAllPosts(data.posts);
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
        const response = await fetch(
          process.env.BACKEND_URL + "/api/posts_by_user_id"
        );
        const data = await response.json();
        setStore({ userPosts: data.posts });
      },
    },
  };
};

export default getState;
