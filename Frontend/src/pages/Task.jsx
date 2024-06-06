import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTask, addTask, delTask } from "../actions/user.action";
import { Button, MenuItem, Select, TextField } from "@mui/material";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    username: "",
    name: "",
    category: "",
    status: "In-progress", // Set default status
    deadline: "",
    priority: "Standard",
    note: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialTasks = async () => {
      try {
        const taskData = await getTask("Rifqi ");
        setTasks(taskData);
      } catch (error) {
        console.error("Error fetching initial tasks:", error);
      }
    };

    fetchInitialTasks();
  }, []);

  const handleFetchTasks = async () => {
    try {
      const loggedInUser = localStorage.getItem("loggedInUser"); // Retrieve username from local storage
      const taskData = await getTask(loggedInUser); // Fetch tasks specific to the logged-in user
      setTasks(taskData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await addTask(newTask);
      await handleFetchTasks();
      setNewTask({
        username: "",
        name: "",
        category: "",
        status: "In-progress", // Reset status to default after adding task
        deadline: "",
        priority: "Standard",
        note: ""
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskName) => {
    try {
      await delTask({ name: taskName });
      await handleFetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const Reload = () => {
    window.location.reload();
  };

  const AddthenReload = async (e) => {
    await handleAddTask(e);
    Reload();
  };
  const HandlebackHome = () => {
    navigate("/Home");
  };

  const DelthenReload = async (e) => {
    await handleDeleteTask(e);
    handleFetchTasks;
  };

  const today = new Date().toLocaleDateString();

  return (
    <div style={styles.app}>
      <nav style={styles.navbar}>
        <div style={styles.navbarContent}>
          <Button variant="contained" onClick={HandlebackHome} style={styles.homeButton}>
            Home
          </Button>
          <span>{today}</span>
          <span>Good Morning Anisa</span>
        </div>
      </nav>
      <div style={styles.container}>
        <div style={styles.taskContainer}>
          <h2>Tasks for Rifqi</h2>
          {tasks.length === 0 ? (
            <p>No tasks found. Let's add some!</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} style={styles.taskCard}>
                <h3>{task.name}</h3>
                <p>Category: {task.category}</p>
                <p>Status: {task.status}</p>
                <p>Deadline: {task.deadline}</p>
                <p>Priority: {task.priority}</p>
                <p>Note: {task.note}</p>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteTask(task.name)}
                  style={styles.deleteButton}
                >
                  Delete
                </Button>
                {task.category === "Study" && (
                  <Button
                    variant="contained"
                    color="primary"
                    style={styles.notesButton}
                  >
                    Notes
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
        <div style={styles.addTaskForm}>
          <h2>Add New Task</h2>
          <TextField
            type="text"
            placeholder="Username"
            value={newTask.username}
            onChange={(e) => setNewTask({ ...newTask, username: e.target.value })}
            style={styles.input}
            fullWidth
            margin="normal"
          />
          <TextField
            type="text"
            placeholder="Name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            style={styles.input}
            fullWidth
            margin="normal"
          />
          <TextField
            type="text"
            placeholder="Category"
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            style={styles.input}
            fullWidth
            margin="normal"
          />
          <Select // Use Select for dropdown menu
            label="Status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            style={styles.input}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="In-progress">In-progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </Select>
          <TextField
            type="date"
            placeholder="Deadline"
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            style={styles.input}
            fullWidth
            margin="normal"
          />
          <Select // Use Select for dropdown menu
            label="Priority"
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            style={styles.input}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Urgent">Urgent</MenuItem>
            <MenuItem value="Standard">Standard</MenuItem>
            <MenuItem value="Relax">Relax</MenuItem>
          </Select>
          <TextField
            placeholder="Note"
            value={newTask.note}
            onChange={(e) => setNewTask({ ...newTask, note: e.target.value })}
            style={styles.textarea}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button variant="contained" onClick={AddthenReload} fullWidth style={styles.button}>
            Add Task
          </Button>
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
  navbar: {
    backgroundColor: "#282c34",
    padding: "1rem",
    color: "white",
    flexShrink: "0",
  },
  navbarContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  homeButton: {
    position: "absolute",
    left: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flex: "1",
    padding: "2rem",
    overflow: "hidden",
  },
  taskContainer: {
    flex: "2",
    padding: "1rem",
    overflowY: "auto",
    borderRight: "1px solid #ccc",
  },
  taskCard: {
    border: "1px solid #ccc",
    padding: "1rem",
    margin: "1rem 0",
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  notesButton: {
    position: "absolute",
    top: "3rem",
    right: "1rem",
  },
  addTaskForm: {
    flex: "1",
    padding: "1rem",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "0.5rem",
    margin: "0.5rem 0",
  },
  textarea: {
    display: "block",
    width: "100%",
    padding: "0.5rem",
    margin: "0.5rem 0",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#282c34",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#61dafb",
  },
};

export default App;