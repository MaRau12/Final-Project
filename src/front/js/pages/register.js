import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [newUser, setNewUser] = useState({full_name: "", user_name: "", email: "", country: "", city: "", password: "", })
  
  const createUser= async () =>{
    const response = await fetch(process.env.BACKEND_URL + " ", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
     });
//setStore?

  }

  return (
    <div className="container text-center mt-5">
         <h1>This is the Register Page</h1>
    <div>
      <div className="mb-3">
       <label for="exampleInputName" className="form-label">Full Name</label>
       <input type="text"  value={newUser.name} className="form-control" id="exampleInputName" onChange={(e) => setNewUser ({...newUser, name: e.target.value})}/>
     </div>

     <div className="mb-3">
       <label for="exampleInputUserName" className="form-label">User Name</label>
       <input type="text"  value={newUser.user_name} className="form-control" id="exampleInputUserName" onChange={(e) => setNewUser ({...newUser, user_name: e.target.value})}/>
     </div>

      <div className="mb-3">
       <label for="exampleInputEmail1" className="form-label">Email address</label>
       <input type="email"  value={newUser.email} className="form-control" id="exampleInputEmail1" />
     </div>

     <div className="mb-3">
       <label for="exampleInputCountry" className="form-label">Country</label>
       <input type="text"  value={newUser.country} className="form-control" id="exampleInputCountry" />
     </div>

     <div className="mb-3">
       <label for="exampleInputCity" className="form-label">City</label>
       <input type="text"  value={newUser.city} className="form-control" id="exampleInputCity" />
     </div>

     <div className="mb-3">
       <label for="exampleInputPassword1" className="form-label">Password</label>
       <input type="password" value={newUser.password} className="form-control" id="exampleInputPassword1"/>
     </div>
   
       <button onClick={()=>{createUser()}} className="btn btn-success"> Register </button>
    </div>
    </div>

   
  );
};
