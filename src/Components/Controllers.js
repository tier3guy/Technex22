import React, { useContext } from 'react';
import '../Components/CSS/Meeting.css';

import { SocketContext } from '../SocketContext';

const Controllers = () => {

  const {mine_id, callAccepted, name, setName, leaveCall, callUser} = useContext(SocketContext);

  return (
    <div class="controllers-container row p-3 justify-content-center">

        <div className="col-3 d-flex align-items-center justify-content-center">

          <button className="btn phone" onClick={ () => leaveCall() }>
            <i class="fa-solid fa-phone"></i>
          </button>

          <button className="btn btn-controller phone">
            <i class="fa-solid fa-tv"></i>
          </button>

          <button className="btn btn-controller phone">
            <i class="fa-solid fa-comment"></i>
          </button>
          
        </div>

      </div>
  )
}

export default Controllers