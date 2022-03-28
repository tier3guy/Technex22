import React from 'react';
import Logo from './Logo';
import '../Components/CSS/Navbar.css';
import About from './About';

const Navbar = () => {
  return (
    <nav class = "navbar container-fluid">
      <div class = "container p-2 d-flex justify-content-between align-items-center"> 
        <Logo/>
        <div>
          <i class="fa-solid fa-message-lines"></i>
          <i class="fa-solid fa-question" data-toggle="modal" data-target="#about-modal"></i>
          <About/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar