import React, {useRef} from "react";
import {Link} from "react-router-dom";
import ConstructionIcon from '@mui/icons-material/Construction';

class Project_Board extends React.Component{
   constructor(props){
      super(props);
      this.id = React.createRef();
      this.name = React.createRef();
      this.description = React.createRef();
      this.state = {
         id: 0,
         name: '',
         description: '',
         newProjectID: 0 //keeps track of array index to add into
      }
   }

   handleInputChange = ({target}) => {
      this.setState({
         [target.name]: target.value
      });
   }

   renderProject(){
      console.log("in renderProject")
      return (
         <Project 
            id = {this.state.id}
            name = {this.state.name}
            description = {this.state.description}
         />
      )
   }

   render(){
   
//      const id = useRef();
//      const name = useRef();
//      const description = useRef();

      return (
         <div>
            <h1> Projects </h1>
            <p> This is the project page </p>
            <ConstructionIcon sx={{ fontSize: 50 }}/>
            <p className="underConstruction" >
            This page is under construction...
            </p>

             <form>
               <label> 
                  Enter a project name:
                  <input 
                     ref = {this.name}
                     type = "text" placeholder = "Enter a name" 
                  />
               </label>
               <label>
                  Enter a project ID: 
                  <input 
                     ref = {this.id}
                     type = "text" placeholder = "Enter a project ID" 
                  />
               </label>
               <label>
                  Enter a project description:
                  <input 
                     ref = {this.description}
                     type = "text" placeholder = "Enter a project description" 
                  />
               </label>
            </form> 
           
            <button onClick = {() => this.renderProject()}> Enter </button>

            
            <Project 
               id ={this.id} 
               name = {this.name}
               description = {this.description} 
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



