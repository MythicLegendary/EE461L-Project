import React, {useRef} from "react";
import { useState } from "react";
import {Link} from "react-router-dom";


function Project_Board(){

   const [currentID, setID] = useState(0); //initial project is ID 0
   const [name, setName] = useState("")
   const [description, setDescription] = useState("")
   const name_field = useRef();
   const description_field = useRef();
   const id_field = useRef();

   const project_props = {name: name_field, description: description_field, id: id_field};

   function display_props(){
      console.log("in display_props")
      let name = name_field.current.value
      let id = id_field.current.value
      let description = description_field.current.value
      setID(id);
      setName(name_field.current.value)
      setDescription(description_field.current.value)
      
   }

   const string = "it didn't work";

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

         <button onClick = {() => display_props()}> Enter </button>
         <p> This is the test string: {currentID} </p>
         <p> New description: {description} </p>
         <p> New ID: {currentID} </p>

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


class Project extends React.Component{
   constructor(props){
      super (props);
      this.state = {
         availableHardwareUnits: 50
      };
   }


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
