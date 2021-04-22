import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import './ControllerContainer.css';

function ControllerContainer() {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        const socket = io();
        socket.on("FromAPI", data => {
          setResponse(data);
        });
        return () => socket.disconnect();
      }, [setResponse]);

    return (
      <div className="App">
        <header className="App-header">
          <p>
            InnesRail Controller
          </p>
        </header>
      </div>
    );
  }
  
  export default ControllerContainer;