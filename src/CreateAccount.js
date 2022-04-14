import { Home } from '@mui/icons-material';
import React, { useState } from 'react';
import AccountForm from './components/AccountForm';


function CreateAccount() {


  const [user, setUser] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const [serverResponse, setServerResponse] = useState("No Response yet");


  async function sendCredentials(details)
  {
    let username = details[Object.keys(details)[0]]
    let password = details[Object.keys(details)[1]]
    let credentials = username + "-" + password;
    // print to the console
    console.log("The entered username: " + username);
    console.log("The eneterd password: " + password);
    // Use fetch protocol to send the data to the backend
    let dict = {
      method : "POST",
      body : JSON.stringify({
        userid: username,
        password: password
      })
    };
    let res = await fetch("/createuser" , dict);
    let responseJson = await res.json();
    
    if(responseJson['errorcode'] == 0)
    {
      setServerResponse("Added User!");
      setError("Added User!")
    }
    else{
        
      setServerResponse("Did not add new user.");
      setError("Did not add new user.")
    }
  }

  const Login = details => {
    sendCredentials(details);
  }

  const Logout = () => {
    setUser({ name: "", password: "" });
  }



  return (
    <div className= "CreateAccount">
      {(user.password != "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <AccountForm Login={Login} error={error} />
      )}
      

    </div>
  );
}
export default CreateAccount;

