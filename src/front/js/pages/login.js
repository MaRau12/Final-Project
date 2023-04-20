import React from "react";

export const Login = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Login Page</h1>
      <div>
      <div className="mb-3">
       <label for="exampleInputEmail1" className="form-label">Email address</label>
       <input type="email"  name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
       <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
     </div>
     <div class="mb-3">
       <label for="exampleInputPassword1" className="form-label">Password</label>
       <input type="password" name="password" className="form-control" id="exampleInputPassword1"/>
     </div>
     <div className="mb-3 form-check">
    </div>
    <button type="submit" clasName="btn btn-success">Login</button>
      </div>
      </div>
     );
  
};
