import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import './App.css'
import Hardware from "./hardware";
import Project_Board from "./project";
import LoginPortal from "./LoginPortal";
import CreateAccount from "./CreateAccount";
import Dataset from "./Dataset";
import Logged from "./Logged";
import HomeScreen from "./HomeScreen";
import  Logout from "./Logout"

export default function App() {
     return (
              <div className = "App">
                  <Routes>
                     <Route path = "/" element = {<Home />} />
                     <Route exact path = "/login" element = {<LoginPortal/>} />
                     <Route path = "Hardware" element ={<Hardware />} />
                     <Route path = "/createaccount" element = {<CreateAccount/>} />
                     <Route path = "Project" element = {<Project_Board/>} />
                     <Route path = "dataset" element = {<Dataset/>} />
                     <Route path = "logout" element = {<Logout/>} />
                  </Routes>
               </div>

          );
}

function Home() {
   return (
      <HomeScreen/>
   );
}





