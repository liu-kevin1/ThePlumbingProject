import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; 
import './loginButton.css'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={{background: "#282c34", position: "absolute", top:0, bottom:0, left:0, right:0, alignItems: "center", display: "block", justifyContent: "center"}}>
      <div>
        <p style={{fontSize: 35, color: "white"}}>Please log in to enter the site.</p>
      </div>
      <button onClick={() => loginWithRedirect({ redirectUri: 'http://localhost:3000'})}>Log In</button>
    </div>
    );
  
};

export default LoginButton;