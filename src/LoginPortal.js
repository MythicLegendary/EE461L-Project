import { Home } from '@mui/icons-material';
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';

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
  }



  return (
    <div className="LoginPortal">
      {(user.password != "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
      

    </div>
  );
}
export default LoginPortal;

