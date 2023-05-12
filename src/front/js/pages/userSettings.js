import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const UserSettings = () => {
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState({ full_name: "", user_name: "", email: "", country: "", city: "", password: "", })
  
  const changeUserData  = async () => {
    const token = sessionStorage.getItem("token");
    const options = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(
      process.env.BACKEND_URL + "/api/edituser",
    )
    if (response.ok) {
      
      await actions.getCurrentUser();
      console.log("user update fetch")
    }
  }
 
    return (
 
      <div className="container text-center mt-5" >

      <div className="vh-100" >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Change your data here</p>

                      <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                        <input type="text" placeholder={store.currentUser.full_name} value={userData.full_name} className="form-control" id="exampleInputName" onChange={(e) => setUserData({ ...userData, full_name: e.target.value })} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputUserName" className="form-label">User Name</label>
                        <input type="text" placeholder={store.currentUser.user_name}  value={userData.user_name} className="form-control" id="exampleInputUserName" onChange={(e) => setUserData({ ...userData, user_name: e.target.value })} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" placeholder={store.currentUser.email} value={userData.email} className="form-control" id="exampleInputEmail1" onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputCountry" className="form-label">Country</label>
                        <input type="text" placeholder={store.currentUser.country} value={userData.country} className="form-control" id="exampleInputCountry" onChange={(e) => setUserData({ ...userData, country: e.target.value })} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputCity" className="form-label">City</label>
                        <input type="text" placeholder={store.currentUser.city} value={userData.city} className="form-control" id="exampleInputCity" onChange={(e) => setUserData({ ...userData, city: e.target.value })} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={userData.password} className="form-control" id="exampleInputPassword1" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                      </div>

                      <button onClick={() => { changeUserData() }} className="btn btn-success"> Save Changes </button>

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
