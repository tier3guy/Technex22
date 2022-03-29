import React, { createContext, useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const socket = io('https://hired-co-server.herokuapp.com/');

const ContextProvider = ( {children} ) => {

  const [streamState, setStreamState] = useState(null);
  const [mine_id, set_mine_Id] = useState('');
  const [name, setName] = useState('Avinash');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const video = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    
    socket.on('me', (_id) => {
      set_mine_Id(_id);
    });

    socket.on('calluser', ({from, name : callerName, signal}) => {
      setCall({isReceivedCall : true, from, name : callerName, signal});
    });

  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, streamState });
    
    peer.on('signal', (data) => {
      socket.emit('answercall', {signal: data, to: call.from});
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  }

  const callUser = (id__) => {

    navigator.mediaDevices.getUserMedia({ video : true, audio : true })
    .then((currentStream) => {
      setStreamState(currentStream);
      video.current.srcObject = currentStream;
    });

    const peer = new Peer({ initiator: true, trickle: false, streamState });
    
    peer.on('signal', (data) => {
      socket.emit('calluser', { userToCall : id__, signalData: data, from: mine_id, name});
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callaccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  }

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  }

  return (
    <SocketContext.Provider value = {{
      call,
      callAccepted,
      video,
      userVideo,
      streamState,
      name,
      setName,
      callEnded,
      mine_id,
      callUser,
      answerCall,
      leaveCall
    }}>
      {children}
    </SocketContext.Provider>
  )

}

export { ContextProvider, SocketContext };