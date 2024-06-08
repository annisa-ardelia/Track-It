import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const username = localStorage.getItem('username'); // Assuming username is stored in localStorage
        const response = await axios.post('/api/getNotes', { username });
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setError('Error fetching notes');
      }
    };

    fetchNotes();
  }, []);

  return (
    <div style={styles.container}>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        notes.map((note) => (
          <Card key={note.id} style={styles.card}>
            <CardContent>
              <Typography variant="h6">{note.name}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    height: '100vh',
    width: '100vw',
    overflow: 'auto',
  },
  card: {
    width: '300px',
    margin: '10px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Notes;