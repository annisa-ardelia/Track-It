import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Task from "./pages/Task";
import Home from "./pages/Home";
import Note from "./pages/Note";
import Pet from "./pages/Pet";
import Profile from "./pages/Profile";
import NoteWrite from "./pages/NoteWrite";

function App() {
  return (
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

export default App;
