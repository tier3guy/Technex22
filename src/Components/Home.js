import React from 'react';
import Navbar from './Navbar'
import svg from '../Assets/main-svg.svg';
import './CSS/Home.css';

const Home = () => {
  return (
    <div className="home">
    <Navbar/>
    <section className="container p-0 pt-5 pb-5 d-flex justify-content-between align-items-center">
    
      <div className="main-text w-50">
        <h1 className="font-main font-blue">Premium high quality video sharing platform.</h1>
        <h5 className="font-main font-light-orange pt-3">
          Hired.CO is a free interview scheduling video calling application. Hired.CO has a inbuilt draw board support and much more cool features.
        </h5>

        <div className="btn-container container p-0">
          <div className="d-flex align-items-center">
            <button className="btn btn-primary font-barlow mt-3 shadow-none">Start Interview</button>
            <input className="input font-barlow mt-3 shadow-nones font-barlow" placeholder='Enter the joining code'/>
          </div>
        </div>

        <hr/>

        <p className="font-barlow font-light-orange">Enter the code and press enter to join the interview.</p>

      </div>
    
      <div className="main-img w-50">
        <img className="" src={svg}/>
      </div>

    </section>
    </div>
  )
}

export default Home