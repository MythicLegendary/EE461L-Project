import React from "react";
import {Link} from "react-router-dom";
import ConstructionIcon from '@mui/icons-material/Construction';

class Project_Board extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         projects: Array(1),

         newProjectID: 0 //keeps track of array index to add into
      }
   }


   render(){
      return (
         <div>
            <h1> Projects </h1>
            <p> This is the project page </p>
            <ConstructionIcon sx={{ fontSize: 50 }}/>
            <p className="underConstruction" >
            This page is under construction...
            </p>
            
               <Project 
                  id ={5} //apparently numbers need to be in {}
                  name = "test project"
                  description = "test description"
               />

            <nav>
               <li>
                  <Link to ="/"> Home </Link>
               </li>
               <li>
                  <Link to = "/hardware"> Hardware </Link>
               </li>
            </nav>
         </div>
      );
   }
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



