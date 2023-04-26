import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = () => {

const navigate = useNavigate();
const [user, setUser] = useState({email:"", password:""})

  const logInUser = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      sessionStorage.setItem("token", token);
      navigate("/")
    
  }
}

  return (
    <div className="container text-center mt-5">
      <h1>Login Page</h1>



      <div className="vh-100" >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">


                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log in here</p>


                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={user.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setUser({ ...user, email: e.target.value })}/>


                        <div id="emailHelp" className="form-text">We'll might sell your email adress.</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>

                        <input type="password" value={user.password} className="form-control" id="exampleInputPassword1" onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                      </div>

                      <button onClick={() => { logInUser() }} className="btn btn-success">Login</button>


                      <div>
                        <Link to="/register">
                          <span>Create new account</span>
                        </Link>
                      </div>


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
