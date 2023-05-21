import React, { useEffect, useState } from "react";

export const Comments = ({ comments }) => {
  const [user, setUser] = useState(null);

  const dateParts = comments.date.split(" ");
  const formattedDate = dateParts.slice(1, 4).join(" ");
  const formattedTime = dateParts[4].slice(0, 5);

  const fetchUserName = async () => {
    try {
      const response = await fetch(
        process.env.BACKEND_URL + `/api/users/${comments.commenting_user_id}`
      );
      const data = await response.json();
      const name =
        data.user.user_name.charAt(0).toUpperCase() +
        data.user.user_name.slice(1);
      setUser({ ...user, name: name, img: data.user.img, id: data.user.id });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <>
      {user && (
        <div className="row justify-content-between py-2 m-2">
          <div className="comment-image text-center col-md-3 mb-2">
            <img
              src={user.img != null ? user.img : "https://placehold.co/500x500"}
            />
          </div>
          <div className="comment-box col-md-8">
            <div className="row justify-content-between align-items-center mt-2">
              <div className="col-4">
                <span className="comment-tag">@ {user.name} </span>
              </div>
              <div className="col-6 text-end me-2">
                <div className="row">
                  <span>{formattedTime}</span>
                </div>
                <div className="row">
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
            <div className="comment-text pt-2 ps-2">
              <p>{comments.comment}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
