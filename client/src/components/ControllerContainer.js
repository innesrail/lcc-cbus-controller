import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import CanBusConsole from './canBusConsole.js'
import './ControllerContainer.css';

const bufferSize = 500

function ControllerContainer() {
    const [messages, setMessages] = useState([]);

    useEffect( () => {
      const socket = io('http://192.168.0.154:3000');
      socket.on("general", data => {
        setMessages(messages => [data, ...((messages.length < bufferSize) ? messages : messages.slice(0, bufferSize-1))])
      });
      return () => socket.disconnect();
    }, [])

    useEffect( () => {
//      console.log('Messages State = ' + JSON.stringify(messages))
    }, [messages])

    return (
      <div className="App">
        <div className="Title">
          <header className="App-header">
            <p>
              InnesRail Controller
            </p>
          </header>
        </div>
        <div className='page'>
          <CanBusConsole logs={messages} />
        </div>
      </div>
    );
  }
  
  export default ControllerContainer