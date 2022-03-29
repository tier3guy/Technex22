import React, { useContext }from 'react';
import './App.css';
import Home from './Components/Home';
import Meeting from './Components/Meeting';
import {SocketContext} from './SocketContext';

function App() {

  const {callAccepted, callEnded} = useContext(SocketContext);

  if(callAccepted && !callEnded) return <Meeting/>
  else return <Home/>

}

export default App;
