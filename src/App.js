import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import './App.css'
import Hardware from "./hardware";
import Project_Board from "./project";
import LoginPortal from "./LoginPortal";
import CreateAccount from "./CreateAccount";

export default function App() {
     return (
              <div className = "App">
                  <Routes>
                     <Route path = "/" element = {<Home />} />
                     <Route exact path = "/login" element = {<LoginPortal/>} />
                     <Route path = "Hardware" element ={<Hardware />} />
                     <Route path = "/createaccount" element = {<CreateAccount/>} />
                     <Route path = "Project" element = {<Project_Board/>} />
                  </Routes>
               </div>

          );
}

function Home() {
   return (
      <>
      <main>   
         <h2>Home</h2>
      </main>
      <nav>
         <li>
            <Link to = "/hardware"> Hardware </Link>
         </li>
         <li>
            <Link to = "/project"> Projects </Link>
         </li>
         <li>
            <Link to ="/login"> Login Portal </Link>
         </li>
         <li>
            <Link to ="/createaccount"> Create Account </Link>
         </li>
      </nav>
      </>
   );
}





