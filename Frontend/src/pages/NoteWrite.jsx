import React, { useState, useEffect } from 'react';
import { Button, Typography, Card, CardContent, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { getNote } from '../actions/note.action';

const NoteWrite = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          setError('Username not found in localStorage');
          return;
        }
        const userNotes = await getNote(username);
        setNotes(userNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setError('Error fetching notes');
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/Home">
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <div style={styles.container}>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <div style={styles.notesContainer}>
            {notes.map((note) => (
              <Card key={note.id} style={styles.card}>
                <CardContent>
                  <Typography variant="h6" noWrap>{note.name}</Typography>
                  <Typography style={styles.noteText}>{note.notes}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
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
  notesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '300px',
    margin: '10px',
    padding: '10px',
    overflow: 'auto',
  },
  noteText: {
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  },
};

export default NoteWrite;
