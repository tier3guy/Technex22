import React, { useContext, useState } from 'react';
import Navbar from './Navbar'
import svg from '../Assets/main-svg.svg';
import './CSS/Home.css';
import MainButton from './MainButton';

import { SocketContext } from '../SocketContext';
import Notifications from './Notifications';

const Home = () => {

  const [idToCall, setIdToCall] = useState('');
  
  const {mine_id, name, setName, leaveCall, callUser, call, answerCall, callAccepted, video, userVideo} = useContext(SocketContext);

  const callInterview = () => {
    console.log(idToCall);
    callUser(idToCall);    
  }


  return (
    <div className="home">

    {
      !callAccepted && call.isReceivedCall && (<Notifications/>)
    }

    <Navbar/>
    <section className="container p-0 pt-5 pb-5 d-flex justify-content-between align-items-center">
   
      <div className="main-text w-50">
        <h1 className="font-main font-blue">Premium high quality video sharing platform.</h1>
        <h5 className="font-main font-light-orange pt-3">
          Hired.CO is a free interview scheduling video calling application. Hired.CO has a inbuilt draw board support and much more cool features.
        </h5>

        <div className="btn-container container p-0">
          <div className="d-flex align-items-center">
            <MainButton text="Call Interview" class__="mt-3" func = {() => callInterview()} />
            <input className="input font-main mt-3 shadow-nones font-barlow" 
                   placeholder='Enter the joining code' 
                   onChange={ (e) => setIdToCall(e.target.value) }
                   value = {idToCall}/>
          </div>
        </div>

        <hr/>

        <p className="font-barlow font-light-orange">Enter the ID and press enter to call the interview.</p>

      </div>

      <div className="main-img w-50">
        <img className="" src={svg}/>
      </div>

    </section>
    </div>
  )
}

export default Home