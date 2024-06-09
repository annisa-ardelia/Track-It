// Importing necessary libraries and tools
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { profile } from "../actions/user.action";
import { getTask } from "../actions/task.action";
import { getNote } from "../actions/note.action";
import { myNewestPet } from "../actions/pet.action";
import petImageMapping from "../images/pet.images";
import { Button, Card, CardContent, Typography } from "@mui/material";

const App = () => {
  // State variables 
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState("");
  const [newestPet, setNewestPet] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const username = localStorage.getItem("username");

        const taskData = await getTask(username);
        setTasks(taskData);

        const userRes = await profile(username);
        setUser(userRes.data);

        const petResponse = await myNewestPet(username);
        if (petResponse.success) {
          setNewestPet(petResponse.data);
        }
        const noteResponse = await getNote(username);
        setNotes(noteResponse);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);
  // Handle view tasks
  const handleViewTasks = () => {
    navigate("/Task");
  };
  // Handle view pet
  const handleViewPet = () => {
    navigate("/Pet");
  };
  // Handle view note write
  const handleViewNoteWrite = () => {
    navigate("/NoteWrite");
  };
  // If loading, display "Loading..."
  if (loading) {
    return <div>Loading...</div>;
  }
  // If error, display error message
  if (error) {
    return <div>{error}</div>;
  }
  // Render the App
  return (
    <div style={styles.app}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.cardContainer}>
          <Card style={{ ...styles.card, ...styles.taskCard }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Tasks for {user.nickname}
              </Typography>
              {tasks.length > 0 ? (
                <div>
                  {tasks.slice(0, 2).map((task) => (
                    <div key={task.id} style={styles.task}>
                      <Typography variant="subtitle1" gutterBottom>
                        {task.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Category: {task.category}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Status: {task.status === "Completed" ? "idle" : task.status}
                      </Typography>
                    </div>
                  ))}
                </div>
              ) : (
                <Typography variant="body2" color="textSecondary" component="p">
                  No recent tasks found.
                </Typography>
              )}
              <Button onClick={handleViewTasks} variant="contained" color="primary">
                View All Tasks
              </Button>
            </CardContent>
          </Card>
          <Card style={{ ...styles.card, ...styles.petCard }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                My Newest Pet
              </Typography>
              {newestPet.length > 0 ? (
                newestPet.map((pet) => (
                  <div key={pet.id} style={styles.pet}>
                    <img style={styles.petImage} src={petImageMapping[pet.pet_avatar]} alt={pet.name} />
                    <Typography variant="subtitle1" gutterBottom>
                      {pet.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Obtained at level {pet.minimum_level}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleViewPet}>
                      See my other pets
                    </Button>
                  </div>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary" component="p">
                  No pets found.
                </Typography>
              )}
            </CardContent>
          </Card>
          <Card style={{ ...styles.card, ...styles.noteCard }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Notes
              </Typography>
              {notes.length > 0 ? (
                notes.slice(0, 2).map((note) => (
                  <div key={note.id} style={styles.note}>
                    <Typography variant="subtitle1" gutterBottom>
                      {note.name}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary" component="p">
                  No notes found.
                </Typography>
              )}
              <Button onClick={handleViewNoteWrite} variant="contained" color="primary">
                View All Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    margin: "0",
    padding: "0",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flex: "1",
    padding: "2rem",
    overflow: "hidden",
    paddingTop: "90px",
  },
  cardContainer: {
    display: "flex",
    flex: "1",
    justifyContent: "space-between",
  },
  card: {
    flex: "1",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  taskCard: {
    marginRight: "1rem",
  },
  petCard: {    flex: "1",
    marginRight: "1rem",
  },
  noteCard: {
    flex: "1",
    marginLeft: "1rem",
  },
  task: {
    marginBottom: "0.5rem",
  },
  pet: {
    marginBottom: "0.5rem",
    textAlign: "left",
  },
  petImage: {
    height: "100px",
    marginBottom: "0.5rem",
  },
  note: {
    marginBottom: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "1rem",
  },
};

export default App;