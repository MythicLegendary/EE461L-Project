import {Link} from "react-router-dom";
import Logged from "./Logged";

const handleLogout = () => {
    Logged.value = 0;
    Logged.userName = "";
    Logged.password = "";
  }

  function Logout(){
    handleLogout();
    return (
        <div className="Logout">
          <h1>You Have Successfully Logged Out.</h1>
          <Link to = "/"> Home </Link>
    
        </div>
      );
  }

  export default Logout;