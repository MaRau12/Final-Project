import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const UserSettings = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState({
    full_name: "",
    user_name: "",
    email: "",
    age: "",
    description: "",
    country: "",
    city: "",
    password: "",
  });
  const [password2, setPassword2] = useState("");
  const [files, setFiles] = useState(null);
  const [preView, setPreview] = useState(null);

  useEffect(() => {
    // create the preview
    if (files != null && files.length > 0) {
      const objectUrl = URL.createObjectURL(files[0]);
      setPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [files]);

  const changeUserData = async () => {
    const token = sessionStorage.getItem("token");
    let body = new FormData();
    if (files != null) {
      body.append("profile_image", files[0]);
    }
    body.append("user_data", JSON.stringify(userData));
    const options = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: body,
    };
    if (userData.password == password2) {
      const response = await fetch(
        process.env.BACKEND_URL + "/api/edituser",
        options
      );
      if (response.ok) {
        await actions.getCurrentUser();
        console.log("user update fetch");
      }
    } else alert("Passwords do not match");
    navigate("/userprofile");
  };

  return (
    <div className="container text-center mt-5">
      <div className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Change your data here
                      </p>
                      <img
                        className="rounded-circle"
                        src={
                          preView != null
                            ? preView
                            : store.currentUser.profile_image_url
                            ? store.currentUser.profile_image_url
                            : "https://placehold.co/200x200"
                        }
                        alt="..."
                        width={200}
                        height={200}
                      />
                      <div className="mb-3">
                        <input
                          type="file"
                          id={"upload-button"}
                          style={{ display: "none" }}
                          onChange={(e) => setFiles(e.target.files)}
                        />
                        <label htmlFor={"upload-button"}>
                          <i
                            className="fa-solid fa-circle-plus fa-2xl mp-0"
                            style={{ marginRight: 10 }}
                          />
                        </label>
                        <button
                          onClick={() => {
                            setFiles(null);
                            setPreview(null);
                          }}
                        >
                          X
                        </button>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputName"
                          className="form-label"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder={store.currentUser.full_name}
                          value={userData.full_name}
                          className="form-control"
                          id="exampleInputName"
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              full_name: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputUserName"
                          className="form-label"
                        >
                          User Name
                        </label>
                        <input
                          type="text"
                          placeholder={store.currentUser.user_name}
                          value={userData.user_name}
                          className="form-control"
                          id="exampleInputUserName"
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              user_name: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          placeholder={store.currentUser.email}
                          value={userData.email}
                          className="form-control"
                          id="exampleInputEmail1"
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputCountry"
                          className="form-label"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          placeholder={store.currentUser.country}
                          value={userData.country}
                          className="form-control"
                          id="exampleInputCountry"
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              country: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputCity"
                          className="form-label"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          placeholder={store.currentUser.city}
                          value={userData.city}
                          className="form-control"
                          id="exampleInputCity"
                          onChange={(e) =>
                            setUserData({ ...userData, city: e.target.value })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputAge" className="form-label">
                          Age
                        </label>
                        <input
                          type="number"
                          placeholder={store.currentUser.age}
                          value={userData.age}
                          className="form-control"
                          id="exampleInputAge"
                          onChange={(e) =>
                            setUserData({ ...userData, age: e.target.value })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputDescription"
                          className="form-label"
                        >
                          Description
                        </label>
                        <textarea
                          type="text"
                          placeholder={store.currentUser.description}
                          value={userData.description}
                          className="form-control"
                          id="exampleInputDescription"
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          value={userData.password}
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword2"
                          className="form-label"
                        >
                          Repeat Password
                        </label>
                        <input
                          type="password"
                          value={password2}
                          className="form-control"
                          id="exampleInputPassword2"
                          onChange={(e) => setPassword2(e.target.value)}
                        />
                      </div>

                      <button
                        onClick={() => {
                          changeUserData();
                        }}
                        className="btn btn-success"
                      >
                        {" "}
                        Save Changes{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
