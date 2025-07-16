import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import EventsList from './components/EventsList';
import CreateEvent from './components/CreateEvent';
import EventDetail from './components/EventDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page at root */}
        <Route path="/" element={<Landing />} />
        
        {/* Events pages with navigation */}
        <Route path="/events" element={
          <div>
            <nav className="nav">
              <div className="nav-content">
                <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
                  <h1 style={{ 
                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    margin: 0 
                  }}>
                    ✨ Tamalee
                  </h1>
                </Link>
                <div className="nav-links">
                  <Link to="/events" className="nav-link">
                    Events
                  </Link>
                  <Link to="/create" className="btn">
                    + Create Vibe
                  </Link>
                </div>
              </div>
            </nav>
            <div className="container">
              <EventsList />
            </div>
          </div>
        } />
        
        <Route path="/create" element={
          <div>
            <nav className="nav">
              <div className="nav-content">
                <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
                  <h1 style={{ 
                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    margin: 0 
                  }}>
                    ✨ Tamalee
                  </h1>
                </Link>
                <div className="nav-links">
                  <Link to="/events" className="nav-link">
                    Events
                  </Link>
                  <Link to="/create" className="btn">
                    + Create Vibe
                  </Link>
                </div>
              </div>
            </nav>
            <div className="container">
              <CreateEvent />
            </div>
          </div>
        } />
        
        <Route path="/event/:id" element={
          <div>
            <nav className="nav">
              <div className="nav-content">
                <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
                  <h1 style={{ 
                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    margin: 0 
                  }}>
                    ✨ Tamalee
                  </h1>
                </Link>
                <div className="nav-links">
                  <Link to="/events" className="nav-link">
                    Events
                  </Link>
                  <Link to="/create" className="btn">
                    + Create Vibe
                  </Link>
                </div>
              </div>
            </nav>
            <div className="container">
              <EventDetail />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;