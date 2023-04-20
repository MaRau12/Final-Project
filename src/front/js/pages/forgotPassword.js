import React from "react";

export const ForgotPassword = () => {
  return (
    <div className="container text-center mt-5">
      <h1>This is the forgot Password page</h1>
      <div>
      <div className="mb-3">
       <label for="exampleInputEmail1" className="form-label">Email address</label>
       <input type="email"  name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
       <div id="emailHelp" className="form-text">Type your registered emailadress.</div>
     </div>

    <button type="submit" clasName="btn btn-success">Send Email</button>
      </div>

    </div>
  );
};