import React, { useContext }from 'react';
import Logo from './Logo';
import './CSS/Navbar.css';
import About from './About';
import MainButton from './MainButton';

import {SocketContext} from '../SocketContext';

const Navbar = () => {

  const {mine_id, name, setName} = useContext(SocketContext);

  return (
    <nav class = "navbar container-fluid">
      <div class = "container p-2 d-flex justify-content-between align-items-center"> 
        
        <Logo/>

        <div class="d-flex justify-content-center align-items-center">

          <MainButton text="Copy your ID" id="getID_Btn" func = { () => navigator.clipboard.writeText(mine_id) } on/>

          <i class="fa-solid fa-question ml-4" data-toggle="modal" data-target="#about-modal"></i>
          <About/>

        </div>

      </div>
    </nav>
  )
}

export default Navbar