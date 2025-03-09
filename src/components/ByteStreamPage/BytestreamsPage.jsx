import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './BytestreamsPage.css';
import logoImage1 from '../assets/cse.png';
import bufferedReaderImage from '../assets/buffered_reader.png';
import { useNavigate } from "react-router-dom";
const BUFFERED_READERS_FOLDER_ID = "1nvs0pbcerRm-1pCcLOk-WJSPZ5pZnnU5"; // Replace with your actual Folder ID
const API_KEY = "AIzaSyCrKnWIvGZkh39oA58YfBR0EktQENVYDt0"; // Replace with your Google Drive API key

const BufferedReadersPage = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [pdfData, setPdfData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 115);
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 📌 Fetch Subfolders (2015-16, 2016-17)
  async function getSubfolders() {
    try {
      const url = `https://www.googleapis.com/drive/v3/files?q='${BUFFERED_READERS_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}&fields=files(id, name)`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch subfolders");
      
      const data = await response.json();
      return data.files.sort((a, b) => b.name.localeCompare(a.name)); // Reverse Order
    } catch (error) {
      console.error("Error fetching subfolders:", error);
      setError("Failed to fetch subfolders.");
      return [];
    }
  }

  // 📌 Fetch PDFs from a Given Folder
  async function getPdfsFromFolder(folderId) {
    try {
      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&key=${API_KEY}&fields=files(id, name, webViewLink)`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch PDFs for folder ${folderId}`);
      
      const data = await response.json();
      return data.files;
    } catch (error) {
      console.error("Error fetching PDFs:", error);
      return [];
    }
  }

  // 📌 Fetch All PDFs Grouped by Year
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
  
      console.log("Fetching subfolders...");

      const subfolders = await getSubfolders();
      console.log("Subfolders fetched:", subfolders);

      const pdfData = {};

      for (const folder of subfolders) {
        console.log(`Fetching PDFs from folder: ${folder.name} (${folder.id})`);
        const pdfs = await getPdfsFromFolder(folder.id);
        console.log(`PDFs in ${folder.name}:`, pdfs);

        if (pdfs.length > 0) {
          pdfData[folder.name] = pdfs;
        }
      }

      console.log("Final PDF Data:", pdfData);
      setPdfData(pdfData);
      setLoading(false);
    }

    fetchData().catch(error => {
      console.error("Error fetching data:", error);
      setError("Failed to load data.");
      setLoading(false);
    });
  }, []);

  const filterOptions = ['ALL', ...Object.keys(pdfData)];

  const toggleCardExpansion = (year) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [year]: !prevState[year],
    }));
  };

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
            <Link to="/buffered-readers" className="nav-link highlight buffered-readers active">
              Buffered Readers
              <div className="active-indicator"></div>
            </Link>
          </div>
          <div className="nav-about">
            <Link to="/about" className="nav-link">About Us</Link>
          </div>
        </div>
      </div>

      {/* Archive Header */}
      <div className="archive-header bytestreams-header">
        <div className="archive-header-content">
          <h1>BYTESTREAMS ARCHIVE</h1>
          <p>Explore these newsletters to witness the rich history of our society</p>

          {/* Dropdown filter */}
          <div className="filter-dropdown-container" ref={dropdownRef}>
            <button 
              className="filter-dropdown-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {activeFilter}
            </button>
            {showDropdown && (
              <div className="filter-dropdown-menu">
                {filterOptions.map((option, index) => (
                  <div 
                    key={index}
                    className="filter-option"
                    onClick={() => {
                      setActiveFilter(option);
                      setShowDropdown(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading/Error States */}
      {loading && <p className="loading-message">Loading PDFs...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Magazines Section */}
      {!loading && !error && (
        <div className="magazines-section">
          {Object.entries(pdfData)
            .filter(([year]) => activeFilter === 'ALL' || activeFilter === year)
            .map(([year, pdfs], index) => (
              <div key={index} className="year-section">
                <div className="year-title" onClick={() => toggleCardExpansion(year)}>
                  {year}
                </div>
                {expandedCards[year] && (
                  <div className="magazines-row">
                    {pdfs.map((pdf, idx) => (
                      <div key={idx} className="magazine-card">
                        <div className="magazine-content">
                          <div className="magazine-text">
                            <h3>{pdf.name}</h3>
                            <button
  className="read-btn"
  onClick={() =>
    navigate("/pdf-viewer", {
      state: { pdfUrl: pdf.id }, // Pass only the file ID
    })
  }
>
  READ
</button>
                          </div>
                          <div className="magazine-image-container">
                            <img src={bufferedReaderImage} className="magazine-image" alt="Buffered Reader" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
      <footer className="footer">
        <p>CSE Society: IIT ISM<br /> Dhanbad</p>
      </footer>
    </div>
  );
};

export default BufferedReadersPage;