import React from "react"
import './canBusConsole.css';

function CanBusConsole(props) {
    
    return (
        <div className='console'>
                {props.logs.map((log, index) =>
                    <p key={index}>
                    {log}
                  </p>
                  )}
      </div>
    )
}

export default CanBusConsole