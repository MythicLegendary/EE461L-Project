import React, { useState, useRef } from 'react';
import {Link} from "react-router-dom";

function Dataset()
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
      <Link to = "/"> Home </Link>
      
    </>
  );
}

export default Dataset

