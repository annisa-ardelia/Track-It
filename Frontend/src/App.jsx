//Import Necessary modules 
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//Import Pages for Routing
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Task from "./pages/Task";
import Home from "./pages/Home";
import Note from "./pages/Note";
import Pet from "./pages/Pet";
import Profile from "./pages/Profile";
import NoteWrite from "./pages/NoteWrite";

// Main App Component for Routing
function App() {
  return (
    // Wrap the Routes in Router to enable Routing
    <Router>
      <div className='grid grid-cols-1 justify-content-center'>
        <div className='flex items-center justify-center'>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Task" element={<Task />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/NoteHome" element={<Note />} />
            <Route path ="/NoteWrite" element={<NoteWrite />} />
            <Route path ="/Pet" element={<Pet />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
// Export the App Component
export default App;
