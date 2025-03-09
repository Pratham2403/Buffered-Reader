import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logoImage2 from './assets/logo.png';
import logoImage1 from './assets/cse.png';
import bufferedReaderImage from './assets/buffered_reader.png';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="Topnav">
        <div className="logo">
        <a href="https://cses.iitism.ac.in/"><img src={logoImage1} alt="CSE Logo" /></a>
        </div>
        <div className="nav-group">
          <div className="nav-basic">
            <Link to="/" className="nav-link active">
              Home
              <div className="active-indicator"></div>
            </Link>
            <Link to="/teams" className="nav-link">Teams</Link>
          </div>
          <div className="nav-special">
            <Link to="/bytestreams" className="nav-link highlight bytestreams">Bytestreams</Link>
            <Link to="/buffered-readers" className="nav-link highlight buffered-readers">Buffered Readers</Link>
          </div>
          <div className="nav-about">
            <Link to="/about" className="nav-link">About Us</Link>
          </div>
        </div>
      </div>

      {/* Journal Header */}
      <div className="journal-header">
        <div className="journal-title-container">
          <div className="journal-logo">
          <img src={logoImage2} alt="Journal Logo" />
          </div>
          <div className="journal-title">
            <p>Computer Science and Engineering Society's</p>
            <h1>TECH JOURNAL</h1>
          </div>
        </div>
      </div>

      {/* Latest Section */}
      <section className="latest-section">
        <div className="latest-left">
          <div className="latest-content">
            <h2>LATEST...</h2>
            <div className="latest-text">
              <h3>CSES Tech </h3>
              <h3>Insights</h3>
              <p>Past & Present</p>
            </div>
          </div>
        </div>
        <div className="latest-right">
          <div className="monsoon-card">
            <div className="monsoon-text">
              <h3>MONSOON</h3>
              <p>MARCH</p>
              <p>v 5.1</p>
              <button className="read-btn" onClick={() => navigate('/buffered-readers')}>READ</button>
            </div>
            <div className="monsoon-image">
              <img src={bufferedReaderImage} alt="Buffered Reader" />
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="purpose-section">
        <div className="purpose-left">
          <div className="section-title">
            <h2>PURPOSE</h2>
          </div>
        </div>
        <div className="purpose-right">
          <h3>What we Aim?</h3>
          <p>
            The aim of the CSE Society is to create a dynamic and supportive 
            environment that nurtures the technical and creative abilities of 
            students in the field of computer science and engineering. We aim 
            to bridge the gap between theoretical knowledge and practical 
            application by organizing a variety of events, workshops, and 
            collaborative projects.
          </p>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events-section">
        <div className="events-left">
          <div className="section-title">
            <h2>UPCOMING EVENTS</h2>
          </div>
        </div>
        <div className="events-right">
          <h3>Udbhav-2024</h3>
          <p>
            Join us as we celebrate the essence of creativity, innovation, and 
            community at Udbhav 2024. Let's make this event a spectacular 
            success, and a memorable chapter in the history of our CSE 
            Department!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>CSE Society: IIT ISM<br />Dhanbad</p>
      </footer>
    </div>
  );
};

export default HomePage;
