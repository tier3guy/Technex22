import React, {useContext} from 'react';
import '../Components/CSS/Meeting.css';
import { socketContext } from '../SocketContext';
import Controllers from './Controllers';

const Meeting = () => {

  const { call, callAccepted, video, userVideo, streamState, name, setName, callEnded, mine_id, callUser, answerCall, leaveCall} = useContext(socketContext);

  return (
    <div className="container-fluid p-3 meet-container d-flex">


      <div className="row p-3 justify-content-between">

        {
          streamState && (
            <div className="mine_screen srn d-flex justify-content-center align-items-center">
              <video playsInline muted autoPlay ref={video}/>
              <p className="font-main">{name || 'Name'}</p>
            </div>
          )
        }

        {
          callAccepted && !callEnded && (
            <div className="users_screen srn d-flex justify-content-center align-items-center">
              <video playsInline autoPlay ref={userVideo}/>
              <p className="font-main">{call.name || 'Name'}</p>
            </div>
          )
        }

      </div>

      <Controllers/>

    </div>
  )
}

export default Meeting