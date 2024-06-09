import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Paper, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import NavbarNote from '../components/NavbarNote';
import { addNote } from '../actions/note.action';

const NoteMakingPage = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [time, setTime] = useState(new Date());
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timerInterval;
    if (timerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        }
      }, 1000);
    } else if (timerMinutes === 0 && timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(timerInterval);
  }, [timerRunning, timerMinutes, timerSeconds]);

  const handleAddNote = async () => {
    try {
      const username = localStorage.getItem('username');
      if (!username) {
        setError('Username not found in localStorage');
        return;
      }
      await addNote(name, username, text);
      navigate("/NoteWrite");
    } catch (error) {
      console.error('Error adding note:', error);
      setError('Error adding note');
    }
  };

  const startTimer = () => {
    if (timerMinutes > 0 || timerSeconds > 0) {
      setTimerRunning(true);
    }
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setTimerMinutes(0);
    setTimerSeconds(0);
  };

  const handleTimerChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minutes') {
      setTimerMinutes(parseInt(value, 10));
    } else {
      setTimerSeconds(parseInt(value, 10));
    }
  };

  return (
    <Box sx={styles.container}>
      <NavbarNote />
      <Box sx={styles.content}>
        <Grid container spacing={3} sx={styles.gridContainer}>
          <Grid item xs={5}>
            <Paper sx={styles.paper}>
              <Typography variant="h5" gutterBottom>Current Time</Typography>
              <Typography variant="h4">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
              <Typography variant="h5" gutterBottom sx={{ marginTop: '20px' }}>Time Left</Typography>
              <Box sx={styles.timerContainer}>
                <Typography variant="h6" sx={styles.timerDisplay}>
                  {timerRunning ? `${String(timerMinutes).padStart(2, '0')}:${String(timerSeconds).padStart(2, '0')}` : 'Timer Stopped'}
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ marginTop: '20px' }}>Set Timer</Typography>
                <TextField
                  name="minutes"
                  label="Minutes"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={timerMinutes}
                  onChange={handleTimerChange}
                  sx={styles.input}
                />
                <TextField
                  name="seconds"
                  label="Seconds"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={timerSeconds}
                  onChange={handleTimerChange}
                  sx={styles.input}
                />
                <Button variant="contained" onClick={startTimer} sx={styles.button}>
                  Start Timer
                </Button>
                <Button variant="contained" onClick={stopTimer} sx={styles.button}>
                  Stop Timer
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper sx={styles.notePaper}>
              <Typography variant="h4">Create a New Note</Typography>
              <TextField
                label="Note Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={styles.inputLarge}
              />
              <TextField
                label="Note Content"
                variant="outlined"
                multiline
                rows={10}
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={styles.inputLarge}
              />
              <Button variant="contained" onClick={handleAddNote} sx={styles.button}>
                Add Note
              </Button>
              {error && <Typography color="error">{error}</Typography>}
</Paper>
</Grid>
</Grid>
</Box>
</Box>
);
};

const styles = {
container: {
display: 'flex',
flexDirection: 'column',
height: '100vh',
},
content: {
flex: 1,
padding: '20px',
overflowY: 'auto',
marginTop: '64px', // Adjust this if the AppBar height is different
},
gridContainer: {
height: '100%',
},
paper: {
padding: '20px',
textAlign: 'center',
height: '100%',
},
notePaper: {
padding: '40px',
textAlign: 'center',
height: '100%',
},
timerContainer: {
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
},
input: {
margin: '10px 0',
},
inputLarge: {
margin: '20px 0',
fontSize: '1.2rem',
},
button: {
marginTop: '20px',
},
timerDisplay: {
marginTop: '20px',
fontSize: '1.2rem',
},
};

export default NoteMakingPage;
