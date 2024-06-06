import React, { useState, useEffect } from "react";
import Navbar from "/components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { getTask , getNick} from "../actions/user.action";
import { Button, Card, CardContent, MenuItem, Select, Typography } from "@mui/material";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialTasks = async () => {
      try {
        const username = localStorage.getItem("username");
        const taskData = await getTask(username);
        setTasks(taskData);

        const nicknameData = await getNick(username);
        setNickname(nicknameData.nickname);
      } catch (error) {
        console.error("Error fetching initial tasks:", error);
      }
    };

    fetchInitialTasks();
  }, []);

  const handleViewTasks = () => {
    navigate("/Task");
  };

  const today = new Date().toLocaleDateString();

  return (
    <div style={styles.app}>
      <Navbar /> {/* Add Navbar here */}
      <div style={styles.container}>
        <div style={styles.taskContainer}>
          <h2>Tasks for {nickname}</h2>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Recent Tasks
              </Typography>
              {tasks.length > 0 ? (
                <div>
                  <div style={styles.task}>
                    <Typography variant="subtitle1" gutterBottom>
                      {tasks[0].name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Category: {tasks[0].category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Status: {tasks[0].status}
                    </Typography>
                  </div>
                  <div style={styles.task}>
                    <Typography variant="subtitle1" gutterBottom>
                      {tasks[1].name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Category: {tasks[1].category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Status: {tasks[1].status}
                    </Typography>
                  </div>
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
    paddingTop: "64px", // Adjusted padding to account for navbar height
    overflow: "hidden",
  },
  taskContainer: {
    flex: "2",
    padding: "1rem",
    overflowY: "auto",
    borderRight: "1px solid #ccc",
  },
  card: {
    marginBottom: "1rem",
    padding: "1rem",
  },
  task: {
    marginBottom: "0.5rem",
  },
};

export default App;
