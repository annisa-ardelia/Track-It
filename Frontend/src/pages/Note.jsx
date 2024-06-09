import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { addNote } from '../actions/note.action';

const NoteMakingPage = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const  Navigate = useNavigate();

  const handleAddNote = async () => {
    try {
      const username = localStorage.getItem('username');
      if (!username) {
        setError('Username not found in localStorage');
        return;
      }
      await addNote(name, username, text);
      Navigate("/NoteWrite");
      // Optionally, you can redirect the user to another page after adding the note
    } catch (error) {
      console.error('Error adding note:', error);
      setError('Error adding note');
    }
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4">Create a New Note</Typography>
      <TextField
        label="Note Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <TextField
        label="Note Content"
        variant="outlined"
        multiline
        rows={10}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
      />
      <Button variant="contained" onClick={handleAddNote} style={styles.button}>
        Add Note
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  input: {
    margin: '10px 0',
  },
  button: {
    marginTop: '20px',
  },
};

export default NoteMakingPage;
