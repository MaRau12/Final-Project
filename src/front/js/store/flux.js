const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      posts: [],
      userPosts: [],
    },
    actions: {
      getAllPosts: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/posts");
        const data = await response.json();
        setStore({ posts: data.posts });
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
