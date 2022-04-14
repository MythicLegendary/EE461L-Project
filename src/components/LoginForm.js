import React, { useState } from 'react'
import {Link} from "react-router-dom";

function LoginForm({ Login, error }) {
const [details, setDetails] = useState({name: "",  password: ""});

const submitHandler = e => {
    e.preventDefault();

    Login(details); 
}

  return (
   <form onSubmit={submitHandler}>
       <div className="form-inner">
           <h2>Login</h2>
           {(error != "") ? ( <div className="error">{error}</div>) : ""}
            <div className="form-group">
                <label htmlFor="">Name: </label>
                <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>
            <div className="form-group">
                <input type="submit" value="LOGIN" />
            </div>
            <nav>
             <Link to = "/"> Home </Link>
          </nav >
        </div>
   </form>
  )
}

export default LoginForm
