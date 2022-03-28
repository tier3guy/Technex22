import React, { useContext }from 'react';

import {socketContext} from '../SocketContext';

const Notifications = () => {

  const {answerCall, callAccepted, call} = useContext(socketContext);

  if(call.isReceivedCall && !callAccepted){
    document.getElementById('notifications-modal').modal('show');
  }
  else{
    document.getElementById('notifications-modal').modal('hide');
  }

  return (
    <>
    <div class="modal fade" id="notifications-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header w-100">
            <h4 class="modal-title font-orange text-center font-barlow" id="exampleModalLabel">{call.name} is calling ...</h4>
          </div>
          <div class="modal-footer w-100">
            <button type="button" class="btn btn-secondary btn-primary w-50">Accept Call</button>
            <button type="button" class="btn btn-secondary btn-primary w-50">Leave Call</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Notifications;