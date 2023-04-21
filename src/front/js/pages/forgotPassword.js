import React from "react";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  return (
    <div className="container text-center mt-5">
      <h1>This is the forgot Password page</h1>
      
      <div className="vh-100" >
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{ borderRadius: "25px" }}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Reset your password here</p>

      <div className="mb-3">
       <label for="exampleInputEmail1" className="form-label">Email address</label>
       <input type="email"  name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
       <div id="emailHelp" className="form-text">Type your registered emailadress.</div>
     </div>

    <button type="submit" className="btn btn-success">Send Email</button>
      
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