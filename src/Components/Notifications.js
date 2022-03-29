import React, { useContext }from 'react';
import { Link } from 'react-router-dom';
import '../Components/CSS/Notifications.css';

import {SocketContext} from '../SocketContext';
import MainButton from './MainButton';

const Notifications = () => {

  const {answerCall, call} = useContext(SocketContext);

  return (
    <>
      <div class="notifications">
        <div class="notifications-container border p-5 w-50">
          <div class="row">
            <h1 className="font-main col-12 font-blue"><span className="font-orange">{call.name}</span> is Calling ...</h1>
          </div>
          <div class="row justify-content-between">

            <MainButton too='/meeting' text="Pick Call" class__="col-5" func={ () => answerCall() }/>
            <MainButton text="Leave Call" class__="col-5"/>

          </div>
        </div>
      </div>
    </>
  )
}

export default Notifications;