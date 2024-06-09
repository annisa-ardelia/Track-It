import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { profile } from "../actions/user.action";

const NavbarNote = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchProfile = async () => {
      const username = localStorage.getItem("username");
      try {
        const apiResponse = await profile(username);
        if (apiResponse.success) {
          setUser(apiResponse.data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (error) {
        setError("Failed to fetch user data");
      }
      setLoading(false);
    };

    fetchProfile();
    const interval = setInterval(() => setDate(new Date()), 60000); // Update date every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button component={Link} to="/home" color="inherit">
          Home
        </Button>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          Keep Up The Spirit, {user.nickname}!
        </Typography>
        <Typography variant="h6">
          {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarNote;
