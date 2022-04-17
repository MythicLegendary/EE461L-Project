import React, {useRef} from "react";
import { useState } from "react";
import {Link} from "react-router-dom";
import currentProjectID from "./project_global";


function Project_Board(){

   const [project_id, setID] = useState(0); //initial project is ID 0
   const [project_name, setName] = useState("")
   const [project_description, setDescription] = useState("")
   const [serverResponse, setServerResponse] = useState("No reponse yet");
   //to get user input from uncontrolled input fields
   const name_field = useRef();
   const description_field = useRef();
   const id_field = useRef();
   const joinID_field = useRef();

   /*
    * Function to update the current state of name, id and description
    * Was causing error if these statements were in one of the async functions
    */

   async function createProject(){
      console.log("in display_props")


      let createProjectName = name_field.current.value;
      let createProjectID = id_field.current.value;
      let createProjectDescription =description_field.current.value;



      console.log("name " + createProjectName);
      console.log("projectid: " + createProjectID);
      console.log("project description: "+createProjectDescription);

      let postDict = {
         method: "POST",
         body: JSON.stringify({
            name: createProjectName,
            projectid: createProjectID,
            description: createProjectDescription 
         })
      };

      console.log("posted data")

      let response = await fetch("/createProject", postDict);
      let responseJson = await response.json();

      console.log("received server response")

      if (responseJson["errorcode"] ==0){
         setServerResponse("Successfully created new project");
      }
      else {
         setServerResponse("Error: new project not created");
      }

      console.log(serverResponse)
      console.log(responseJson)
      
   }
   

   return (
      <>
         <br></br>
         <br></br>

          <form>
            <label> 
               Enter a project name: 
               <input 
                  ref = {name_field}
                  type = "text" placeholder = "Enter a name" 
               />
            </label>
         <br></br>
            <label>
               Enter a project ID: 
               <input 
                  ref = {id_field}
                  type = "text" placeholder = "Enter a project ID" 
               />
            </label>
         <br></br>
            <label>
               Enter a project description:
               <input 
                  ref = {description_field}
                  type = "text" placeholder = "Enter a project description" 
               />
            </label>
         </form> 

         <button onClick = {() => createProject()}> Create new project </button>

         <p className = "warning"> Do not use "!" or a space character </p>
            
            <GetProject/>
         
         <p> Server response for creating a project is: {serverResponse} </p>



         <nav>
            <li>
               <Link to ="/"> Home </Link>
            </li>
            <li>
               <Link to = "/hardware"> Hardware </Link>
            </li>
         </nav>

      </>
   )
}

export default Project_Board;
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
    setServerResponse("\nName: " + name + " \nProject id: " + projectid + " \nDescription: " + des);

     currentProjectID = projectid;
     console.log(currentProjectID)
  }
  return(
    <>
      <div>
         <br></br>
         <label>
          Enter Project ID to join:
          <input ref = {namefield} type = "text" placeholder = "Enter a project id" size = "21"></input>
         </label>
        </div>
        <div>
          <button onClick = {() => sendCredentials()}>Join a project</button>
         <p>Server Response for joining a project is: {serverResponse}</p>
      </div>
    </>
  );
}
/*
 *
         <button onClick = {() => createProject()}> Create new project </button>
function joinProject(){

   const [serverResponse, setServerResponse] = useState("No reponse yet");
   const joinID_field = useRef();
   async function getProject(){
      
      let join_ID = joinID_field.current.value;

      let postDict = {
         method: "POST",
         body: JSON.stringify({
            id: join_ID
         })
      };

      let res = await fetch("/getProject", postDict);
      let responseJson = await res.json();

      console.log(responseJson)

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

      return (

         <>
            <form>

               <label> Enter Project ID of project to join: 
                  <input ref = {joinID_field} type = "text" placeholder = "Enter a project ID" />
               </label>
            
            <button onClick = {() => getProject()}> Join a project </button>
            <p> Server response: {serverResponse} </p>
            </form>

         </>
      )

}
*/
class Project extends React.Component{
   constructor(props){
      super (props);
      this.state = {
         availableHardwareUnits: 50
      };
   }
//renders an instance of the Project class
//         <Project id = {project_id} name={project_name} description={project_description} />
   render(){

      const id = this.props.id;
      const name = this.props.name;
      const description = this.props.description;
      const availableHardwareUnits = this.state.availableHardwareUnits;
      return (
         <div>
            <p> Project id: {id} </p>
            <p> Project name: {name} </p>
            <p> Project description: {description} </p>
            <p> Available hardware: {availableHardwareUnits} </p>
         </div>
      );
   }
}
