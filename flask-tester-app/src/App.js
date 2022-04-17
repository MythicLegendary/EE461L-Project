/*
  File: App.js
  Purpose: This application is meant to test the flask applications functionality
  Author: William Wooten
  Json protocol config: David
*/


import './App.css';
import React from 'react';
import {useState, useEffect, useRef} from 'react';
let localhost = "http://127.0.0.1:5000/";
/* for testing entries for login credentials, and deletions of credentials*/
function AddUsers()
{
  // Holds the entered username
  const usernamefield = useRef();
  const passwordfield = useRef();
  const [serverResponse, setServerResponse] = useState("Nothing entered yet");

  // Sends the credentials to the flask backend
  async function sendCredentials()
  {
    let username = usernamefield.current.value;
    let password = passwordfield.current.value;
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
    }
    else{
      setServerResponse("Did not add new user.");
    }
  }
  return(
  <>
    <h2>Add new users</h2>
    <div>
        <h3>Enter a username and password</h3>
        <div>
          <input ref = {usernamefield} type = "text" placeholder = "Enter a username" size = "21"></input>
        </div>
        <div>
          <input ref = {passwordfield} type = "text" placeholder = "Enter a password" size = "21"></input>
        </div>
        <div>
          <button onClick = {() => sendCredentials()}>Enter</button>
         <label>{serverResponse}</label>
        </div>
    </div>
    <div>
    </div>
  </>);
}

/*For testing the removal of users from the database*/
function RemoveUsers()
{
  const [serverResponse, setServerResponse] = useState("Nothing Entered Yet");
  const usernamefield = useRef();
  async function sendCredentials()
  {
    let username = usernamefield.current.value;
    console.log("The entered username for removal: " + username);
        // Use fetch protocol to send the data to the backend
    let dict = {
      method : "POST",
      body : JSON.stringify({
        userid: username
      })
    };
    let res = await fetch("/removeuser" , dict);
    let responseJson = await res.json();
    
    if(responseJson['errorcode'] == 0)
    {
      setServerResponse("User removed!");
    }
    else{
      setServerResponse("There was a problem in removing.");
    }
  }
  return(
    <>
      <h2>Remove an existing user</h2>
      <h3>Enter the username  of the user to remove</h3>
      <div>
        <input ref = {usernamefield} type = "text" placeholder = "Enter the username"></input>
      </div>
      <button onClick = {sendCredentials}>Enter</button>
      <label>{serverResponse}</label>
    </>
  );
}
/* Ensures that user information is correct */
function ValidateUsers()
{
  const [serverResponse, setServerResponse] = useState("No Response yet");
  const usernamefield = useRef();
  const passwordfield = useRef();
  async function sendCredentials()
  {
    let username = usernamefield.current.value;
    let password = passwordfield.current.value;
    console.log("The entered username: " + username);
    console.log("The eneterd password: " + password);

    // Fetch protocol
    let dict = {
      method : "POST",
      body : JSON.stringify({
        userid: username,
        password: password
      })
    };
    let res = await fetch("/verifyuser" , dict);
    let responseJson = await res.json();
    if(responseJson['valid'])
    {
      setServerResponse("User was verified!");
    }
    else{
      setServerResponse("User was not verified!");
    }
  }

  return(
    <>
      <h2> Validate a username and password combination</h2>
      <div>
          <h3>Enter a username and password pair to validate</h3>
          <input ref = {usernamefield} type = "text" placeholder = "Enter a username" size = "21"></input>
        </div>
        <div>
          <input ref = {passwordfield} type = "text" placeholder = "Enter a password" size = "21"></input>
        </div>
        <div>
          <button onClick = {() => sendCredentials()}>Enter</button>
         <label>{serverResponse}</label>
      </div>
      
    </>
  );
}

/* Adds hardware sets to the database*/
function AddHW()
{
  const [serverResponse, setServerResponse] = useState("No Response yet");
  const namefield = useRef();
  const qfield = useRef();
  
  async function sendCredentials()
  {
    let name = namefield.current.value;
    let q = qfield.current.value;
    console.log("Entered name: " + name);
    console.log("Enter q: " + q);
       // Fetch protocol
       let dict = {
        method : "POST",
        body : JSON.stringify({
          name: name,
          capacity:  q
        })
      };
      let res = await fetch("/createHWSet" , dict);
      let responseJson = await res.json();
      if(responseJson['errorcode'] == 0)
      {
        setServerResponse("Hardware set added!");
      }
      else{
        setServerResponse("Set not added!");
      }
  }

  return(
    <>
      <h2>Add a hardware set</h2>
      <div>
          <h3>Enter a name and quantity</h3>
          <input ref = {namefield} type = "text" placeholder = "Enter a set name" size = "21"></input>
        </div>
        <div>
          <input ref = {qfield} type = "text" placeholder = "Enter an amount" size = "21"></input>
        </div>
        <div>
          <button onClick = {() => sendCredentials()}>Enter</button>
         <label>{serverResponse}</label>
      </div>
      
    </>
  );
}

/* Removes a hardware set form the database*/
function RemoveHW()
{
  const [serverResponse, setServerResponse] = useState("No Response yet");
  const namefield = useRef();
  
  async function sendCredentials()
  {
    let name = namefield.current.value;
    console.log("Entered name: " + name);
       // Fetch protocol
       let dict = {
        method : "POST",
        body : JSON.stringify({
          name: name
        })
      };
      let res = await fetch("/removeHWSet" , dict);
      let responseJson = await res.json();
      if(responseJson['errorcode'] == 0)
      {
        setServerResponse("Hardware set removed!");
      }
      else{
        setServerResponse("There was an error!");
      }
  }

  return(
    <>
      <h2>Remove a hardware set</h2>
      <div>
          <h3>Enter a name</h3>
          <input ref = {namefield} type = "text" placeholder = "Enter a set name" size = "21"></input>
        </div>
        <div>
          <button onClick = {() => sendCredentials()}>Enter</button>
         <label>{serverResponse}</label>
      </div>
      
    </>
  );
}
/*Request Resources from a hardware set*/
function RequestResources()
{
  const [serverResponse, setServerResponse] = useState("No Response yet");
  const namefield = useRef();
  const qfield = useRef();
  
  async function sendCredentials()
  {
    let amount = qfield.current.value;
    let name = namefield.current.value;
    console.log("Name of the hardware set: " + name);
    console.log("Amount requested: " + amount);

    // Fetch protocol
    let dict = {
      method : "POST",
      body : JSON.stringify({
        name: name,
        request: amount
      })
    };
    let res = await fetch("/requestResources" , dict);
    let responseJson = await res.json();

    if(responseJson["errorcode"] == 0)
    {
      setServerResponse("Request filled, or filled to best ability! (Or no errors)");
    }
    else{
      setServerResponse("Unable to fill request, or there was an error");
    }

  }

  return(
    <>
      <h2>Request Resources from a hardware set</h2>
      <div>
          <h3>Enter a name and quantity</h3>
          <input ref = {namefield} type = "text" placeholder = "Enter a set name" size = "21"></input>
        </div>
        <div>
          <input ref = {qfield} type = "text" placeholder = "Enter an amount" size = "21"></input>
        </div>
        <div>
          <button onClick = {() => sendCredentials()}>Enter</button>
         <label>{serverResponse}</label>
      </div>
      
    </>
  );
}
/* Returns resources to a hardware set*/
function ReturnResources()
{
  const [serverResponse, setServerResponse] = useState("No Response yet");
  const namefield = useRef();
  const qfield = useRef();
  
  async function sendCredentials()
  {
    let amount = qfield.current.value;
    let name = namefield.current.value;
    console.log("Name of the hardware set: " + name);
    console.log("Amount requested: " + amount);

    // Fetch protocol
    let dict = {
      method : "POST",
      body : JSON.stringify({
        name: name,
        return: amount
      })
    };
    let res = await fetch("/returnResources" , dict);
    let responseJson = await res.json();

    if(responseJson["errorcode"] == 0)
    {
      setServerResponse("Return filled, or filled to best ability! (Or no errors)");
    }
    else{
      setServerResponse("Unable to fill return, or there was an error");
    }

  }

  return(
    <>
      <h2>Return Resources to a hardware set</h2>
      <div>
          <h3>Enter a name and quantity</h3>
          <input ref = {namefield} type = "text" placeholder = "Enter a set name" size = "21"></input>
        </div>
        <div>
          <input ref = {qfield} type = "text" placeholder = "Enter an amount" size = "21"></input>
        </div>
        <div>
          <button onClick = {() => sendCredentials()}>Enter</button>
         <label>{serverResponse}</label>
      </div>
      
    </>
  );
}
/* When Prompted Displays the names of all of the sets in the database */
function SetNames()
{
  const [serverResponse, setServerResponse] = useState("No Sets Displayed Yet");
  
  async function getSets()
  {

  }
  return(
    <>
      <h2>Display all known Hardware Set Names</h2>
      <div>
        <button>Print</button>
        <label>{serverResponse}</label>
      </div>

    </>
  );
}


/*Creates a project*/
function CreateProject()
{
  const [serverResponse, setServerResponse] = useState("No Response Yet");
  const namefield = useRef();
  const descriptionfield = useRef();
  const idfield = useRef();

  async function sendCredentials()
  {
    let name = namefield.current.value; 
    let des = descriptionfield.current.value;
    let id  = idfield.current.value;
    console.log("The name entered: "+  name);
    console.log("The description entered: " + des);
    console.log("The project id entered: " + id);

    let dict = {
      method : "POST",
      body : JSON.stringify({
        name: name,
        description: des,
        projectid: id
      })
    };
    let res = await fetch("/createProject" , dict);
    let responseJson = await res.json();

    if(responseJson["errorcode"] == 0)
    {
      setServerResponse("Project Created Successfully!");
    }
    else{
      setServerResponse("Project not created!");
    }
  }
  
  return(
    <>
      <h2>Create a new Project</h2>
      <div>
          <h3>Enter a name and quantity</h3>
          <input ref = {namefield} type = "text" placeholder = "Enter a name" size = "21"></input>
        </div>
        <div>
          <input ref = {descriptionfield} type = "text" placeholder = "Enter a description" size = "21"></input>
        </div>
        <div>
          <input ref = {idfield} type = "text" placeholder = "Enter a projectid" size = "21"></input>
        </div>
        <div>
          <button onClick = {() => sendCredentials()}>Enter</button>
         <label>{serverResponse}</label>
      </div>
      
    </>
  );
}
/* Removes a project from the database with the given project id*/
function RemoveProject()
{
  const [serverResponse, setServerResponse] = useState("No Response Yet");
  const namefield = useRef();
  async function sendCredentials()
  {
    let id = namefield.current.value;
    console.log("The name of the project to be removed: " + id);
    let dict = {
      method : "POST",
      body : JSON.stringify({
        id : id
      })
    };
    let res = await fetch("/removeProject" , dict);
    let responseJson = await res.json();

    if(responseJson["errorcode"] == 0)
    {
      setServerResponse("Project Removed Successfully!");
    }
    else{
      setServerResponse("Project not removed!");
    }
  }
  return(
    <>
      <h2>Remove a Project</h2>
      <div>
          <h3>Enter the project id of the project to be removed</h3>
          <input ref = {namefield} type = "text" placeholder = "Enter a project id" size = "21"></input>
        </div>
        <div>
          <button onClick = {() => sendCredentials()}>Enter</button>
         <label>{serverResponse}</label>
      </div>
      
    </>
  );
}


/* Gets the data associated with a given project*/
function GetProject()
{
  const [serverResponse, setServerResponse] = useState("No Response Yet");
  const namefield = useRef();
  async function sendCredentials()
  {
    let id = namefield.current.value;
    console.log("The id of the projec to get is : " + id);
    let dict = {
      method : "POST",
      body : JSON.stringify({
        id : id
      })
    };
    let res = await fetch("/getProject" , dict);
    let responseJson = await res.json();
    if(responseJson['errorcode'] != 0)
    {
      setServerResponse("Fialure in retreival");
      return;
    }
    let name = responseJson['name'];
    let projectid = responseJson['projectid'];
    let des = responseJson['description'];
    setServerResponse("The name: " + name + " The project id: " + projectid + " THe description: " + des);
  }
  return(
    <>
      <h2>Get the data of the project</h2>
      <div>
          <h3>Enter the project id</h3>
          <input ref = {namefield} type = "text" placeholder = "Enter a project id" size = "21"></input>
        </div>
        <div>
          <button onClick = {() => sendCredentials()}>Enter</button>
         <label>{serverResponse}</label>
      </div>
    </>
  );
}

/* Moves hardware to and from a given project*/
function CheckoutToProject()
{
  const [serverResponse, setServerResponse] = useState("No Response Yet");
  const hardwareField = useRef();
  const idField = useRef();
  const amountField = useRef();
  async function requestHardware()
  {

    let hardwareset = hardwareField.current.value;
    let id = idField.current.value;
    let amount = amountField.current.value;

    console.log("Requesting hardware from a project");
    console.log("The id of the project: " + id);
    console.log("The amount: " + amount);
    console.log("The name of the hardware set: " + hardwareset);
    let dict = {
      method : "POST",
      body : JSON.stringify({
        projectid : id,
        hardwareName : hardwareset,
        qty  : amount,
        inout : "checkout"
      })
    };
    let res = await fetch("/hardwareToProject" , dict);
    let responseJson = await res.json();

    if(responseJson['errorcode'] != 0)
    {
      setServerResponse("There was an error");
    }
    else{
      setServerResponse("Request/Return did not produce an error");
    }
  }
  async function returnHardware()
  {
    let hardwareset = hardwareField.current.value;
    let id = idField.current.value;
    let amount = amountField.current.value;

    console.log("Returning hardware from a project");
    console.log("The id of the project: " + id);
    console.log("The amount: " + amount);
    console.log("The name of the hardware set: " + hardwareset);

    let dict = {
      method : "POST",
      body : JSON.stringify({
        projectid : id,
        hardwareName : hardwareset,
        qty  : amount,
        inout : "checkin"
      })
    };
    let res = await fetch("/hardwareToProject" , dict);
    let responseJson = await res.json();
    
    if(responseJson['errorcode'] != 0)
    {
      setServerResponse("There was an error");
    }
    else{
      setServerResponse("Request/Return did not produce an error");
    }
  }

  return(
    <>
      <h2> Move Resources to or from a project</h2>
      <div>
          <h3>Enter the projectid, the hardware set name and quantity of hardware to request/return</h3>
          <input ref = {idField} type = "text" placeholder = "Enter the project id" size = "21"></input>
        </div>
        <div>
          <input ref = {hardwareField} type = "text" placeholder = "Enter a hw name" size = "21"></input>
        </div>
        <div>
          <input ref = {amountField} type = "text" placeholder = "Enter the amount"></input>
        </div>
        <div>
          <button onClick = {() => returnHardware()}>Enter to return the amount</button>
      </div>s
      <div>
        <button onClick = {() => requestHardware() } > Enter to request the amount</button>
      </div>
      <label>{serverResponse}</label>
      
    </>
  );
}

/* Returns the meta data given a dataset name*/
function DisplayMetaData()
{
  const [serverResponse, setServerResponse] = useState("No Response Yet");
  const datasetNumField = useRef();

  async function requestMetaData()
  {
    let datasetNum = datasetNumField.current.value;
    console.log("The dataset number requested was: " + datasetNum);
    /* Create the HTTP request dict*/
    let dict = {
      method : "POST",
      body : JSON.stringify({
        datasetNum : datasetNum
      })
    };
    let res = await fetch("/metadataRequest" , dict);
    let responseJson = await res.json();

    /* If the errorcode signal failure, print nothing*/
    if(responseJson['errorcode'] != 0)
    {
      setServerResponse("Meta data failed to load; try different input");
      return;
    }
    let newDisplay = "";
    newDisplay = "Database: " + responseJson['Database'] + " Description: " + responseJson['Description'] + " Entries: " + responseJson["Entries"] + " Unit: " + responseJson["Unit"] + " Link: " + responseJson["Link"];
    setServerResponse(newDisplay);
  }
  return(
    <>
      <h2> Display a Dataset Metadata</h2>
      <div>
          <h3>Enter the projectid, the hardware set name and quantity of hardware to request/return</h3>
          <input ref = {datasetNumField} type = "text" placeholder = "Enter the number(1-5) of the dataset" size = "26"></input>
        </div>
        <div>
          <button onClick = {() => requestMetaData()}>Enter to return the amount</button>
      </div>
      <label>{serverResponse}</label>
      
    </>
  );
}
function GetHW()
{
  const [serverResponse, setServerResponse] = useState("No Response Yet");
  const nameField = useRef();

  async function requestMetaData()
  {
    let name = nameField.current.value;
    console.log("The hwset name requested was: " + name);
    /* Create the HTTP request dict*/
    let dict = {
      method : "POST",
      body : JSON.stringify({
        name : name
      })
    };
    let res = await fetch("/getHardwareSet" , dict);
    let responseJson = await res.json();

    /* If the errorcode signal failure, print nothing*/
    if(responseJson['errorcode'] != 0)
    {
      setServerResponse("Retrieval Failure");
      return;
    }
    console.log(responseJson);
    let response = "Name: " + responseJson['name'] + " Capacity: " + responseJson['capacity'] + " Avail: " + responseJson["availability"];
    setServerResponse(response);
  }
  return(
    <>
      <h2> Get hardware set data</h2>
      <div>
          <h3>Enter the name of the hardware set you want data from</h3>
          <input ref = {nameField} type = "text" placeholder = "Name of the hwset" size = "26"></input>
        </div>
        <div>
          <button onClick = {() => requestMetaData()}>Enter</button>
      </div>
      <label>{serverResponse}</label>
      
    </>
  );
}

function App() {
  return (
    <>
      <h1>This React app is for testing the functions in the Flask application: app.py</h1>
      <h2>Using MongoDB Compass check here:</h2>
      <h3>{"mongodb+srv://avengineers461L:MwycDXNBxKObOc3I@cluster0.s12ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"}</h3>
      <AddUsers/>
      <RemoveUsers/>
      <ValidateUsers/>
      <AddHW/>
      <GetHW/>
      <RequestResources/>
      <ReturnResources/>
      <RemoveHW/>
      <CreateProject/>
      <GetProject/>
      <RemoveProject/>
      <CheckoutToProject/>
      <DisplayMetaData/>
    </>
  );
}

export default App;
