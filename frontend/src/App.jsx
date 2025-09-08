import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Front from './frontpage';
import Dashboard from './dashboard';
import Addstudent from './Addstudent';
import Enrolled from './Enrolled';
import Signin from './signin';
import Period from './period';
import VerificationCam from './VerificationCam';  // <-- add this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Addstudent" element={<Addstudent/>}/>
        <Route path="/Enrolled" element={<Enrolled/>}/>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/Period" element={<Period/>}/>
        <Route path="/verification" element={<VerificationCam />} /> {/* new route */}
      </Routes>
    </Router>
  );
}

export default App;
