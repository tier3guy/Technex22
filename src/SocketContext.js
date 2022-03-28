import React, { createContext, useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import { io } from 'socket.io-client';

const socketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ( {children} ) => {

  const [streamState, setStreamState] = useState(null);
  const [mine_id, set_mine_Id] = useState('');
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const video = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video : true, audio : true })
    .then((currentStream) => {
      setStreamState(currentStream);
      video.current.srcObject = currentStream;
    })

    socket.on('joined', (_id) => {
      set_mine_Id(_id);
    });

    socket.on('call', ({from, name : callerName, signal}) => {
      setCall({isReceivedCall : true, from, name : callerName, signal});
    });

  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, streamState });
    
    peer.on('signal', (data) => {
      socket.emit('answerCall', {signal: data, to: call.from});
    });

    peer.on('stream', (streamState) => {
      userVideo.current.srcObject = streamState;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  }

  const callUser = (id__) => {
    const peer = new Peer({ initiator: true, trickle: false, streamState });
    
    peer.on('signal', (data) => {
      socket.emit('call', {userToCall_ID : id__, signal_data: data, from: mine_id, name});
    });

    peer.on('stream', (streamState) => {
      userVideo.current.srcObject = streamState;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal = signal;
    });

    connectionRef.current = peer;
  }

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();

    window.location.reload();
  }

  return (
    <socketContext.Provider value = {{
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
    </socketContext.Provider>
  )

}

export { ContextProvider, socketContext };