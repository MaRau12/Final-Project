import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [newUser, setNewUser] = useState({ full_name: "", user_name: "", email: "", country: "", city: "", password: "", })
  

  const createNewUser = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }
    )
    if (response.ok) {
      navigate("/login");
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

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                        <input type="text" value={newUser.full_name} className="form-control" id="exampleInputName" onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputUserName" className="form-label">User Name</label>
                        <input type="text" value={newUser.user_name} className="form-control" id="exampleInputUserName" onChange={(e) => setNewUser({ ...newUser, user_name: e.target.value })} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={newUser.email} className="form-control" id="exampleInputEmail1" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputCountry" className="form-label">Country</label>
                        <input type="text" value={newUser.country} className="form-control" id="exampleInputCountry" onChange={(e) => setNewUser({ ...newUser, country: e.target.value })} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputCity" className="form-label">City</label>
                        <input type="text" value={newUser.city} className="form-control" id="exampleInputCity" onChange={(e) => setNewUser({ ...newUser, city: e.target.value })} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={newUser.password} className="form-control" id="exampleInputPassword1" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                      </div>

                      <button onClick={() => { createNewUser() }} className="btn btn-success"> Register </button>

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
