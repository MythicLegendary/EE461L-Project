import { Home } from '@mui/icons-material';
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Logged from './Logged';
import HomeScreen from './HomeScreen'
import {Link} from "react-router-dom";


function LoginPortal() {

  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const [serverResponse, setServerResponse] = useState("No Response yet");


  async function sendCredentials(details) {
    let username = details[Object.keys(details)[0]]
    let password = details[Object.keys(details)[1]]
    console.log(username)
    console.log(password)
    
    // Fetch protocol
    let dict = {
      method: "POST",
      body: JSON.stringify({
        userid: username,
        password: password
      })
    };

    let res = await fetch("/verifyuser", dict);
    let responseJson = await res.json();
    console.log(responseJson);

    if (responseJson['valid']) {
      console.log("Logged in")
      setUser({
        name: username,
        password: password
      });
      Logged.value = 1;
      Logged.userName = username;
      Logged.password = password;
      setServerResponse("User was verified");
      
    } else {
      console.log("Details do not match")
      setError("Details do not match")
      setServerResponse("User was not verified");
    }
  }
  const Login = details => {
    sendCredentials(details);
  }

  const Logout = () => {
    setUser({ name: "", password: "" });
    Logged.value = 0;
  }



  return (
    <div className="LoginPortal">
      {(user.password != "") ? (
        <div className="welcome">
          <h1>Welcome, {Logged.userName}!</h1>
          <Link to = "/"> Home </Link>  
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
      

    </div>
  );
}
export default LoginPortal;

