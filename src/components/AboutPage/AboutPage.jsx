import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';
import logoImage1 from '../assets/cse.png';

const AboutPage = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 115);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="buffered-readers-container">
      {/* Navbar */}
      <div className={`Topnav ${isSticky ? 'sticky' : ''}`}>
        <div className="logo">
        <a href="https://cses.iitism.ac.in/"><img src={logoImage1} alt="CSE Logo" /></a>
        </div>
        <div className="nav-group">
          <div className="nav-basic">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/teams" className="nav-link">Teams</Link>
          </div>
          <div className="nav-special">
            <Link to="/bytestreams" className="nav-link highlight bytestreams">Bytestreams</Link>
            <Link to="/buffered-readers" className="nav-link highlight buffered-readers">
              Buffered Readers
            </Link>
          </div>
          <div className="nav-about">
            <Link to="/about" className="nav-link active">
              About Us
              <div className="active-indicator"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="introduction">
        <div className="heading">Our Aim ?</div>
        <div className="content">
          Buffered Reader transcends the realm of a mere magazine, serving as a catalyst for intellectual curiosity and creativity within the CSE Society. We bridge the gap between theory and real-world application with insights into cutting-edge technological advancements. Our meticulously curated content ignites innovation, cultivates collaboration, and empowers readers with indispensable knowledge for both academic and professional triumphs. Ultimately, Buffered Reader cultivates a strong sense of community and champions lifelong learning in the ever-evolving world of Computer Science and Engineering.
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>CSE Society: IIT ISM<br />Dhanbad</p>
      </footer>
    </div>
  );
};

export default AboutPage;
