// Import necessary modules
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
// Import necessary functions
import { UpdateOwnedPet } from "../actions/pet.action";
import { updatePoint, incrementLevel, profile } from "../actions/user.action";
import { getTask, addTask, delTask, updateT, doneT, startT } from "../actions/task.action";
// Import necessary components
import { Button, MenuItem, Select, TextField } from "@mui/material";

// Main App component
const App = () => {
  // State variables
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    category: "",
    status: "", 
    deadline: "",
    priority: "Standard",
    note: ""
  });
  // Hook to navigate to different pages
  const navigate = useNavigate();
  // Effect hook to fetch data
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const username = localStorage.getItem("username");
        const taskData = await getTask(username);
        setTasks(taskData);
        const nick = await profile(username);
        setUser(nick.data);
        handleDeadline(taskData, username);
      } catch (error) {
        console.error("Error Getting Task", error);
      }
    };

    fetchInitial();
  }, []);

  // Function to fetch tasks
  const handleFetchTasks = async () => {
    try {
      const loggedInUser = localStorage.getItem("username");
      const taskData = await getTask(loggedInUser); 
      setTasks(taskData);
      handleDeadline(taskData, loggedInUser);
    } catch (error) {
      console.error("Error Getting Task", error);
    }
  };
  // Function to add a task
  const handleAddTask = async () => {
    try {
      const username = localStorage.getItem("username");
      const taskWithUsername = { ...newTask, username };
      await addTask(taskWithUsername);
      await handleFetchTasks();
      setNewTask({
        name: "",
        category: "",
        status: "", 
        deadline: "",
        priority: "Standard",
        note: ""
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  // Function to delete a task
  const handleDeleteTask = async (taskName) => {
    try {
      await delTask({ name: taskName });
      await handleFetchTasks();
      setNewTask({
        name: "",
        category: "",
        status: "", 
        deadline: "",
        priority: "Standard",
        note: ""
      });   
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  // Function to update a task
  const handleDoneTask = async (taskName) => {
    try {
      const username = localStorage.getItem("username");
      await doneT(username, taskName);
      await updatePoint(username);
      await incrementLevel(username);
      await UpdateOwnedPet(username);
      await handleFetchTasks();
    } catch (error) {
      console.error("Error Finishing Task", error);
    }
  };
  // Function to start a task
  const handlestartTask = async(taskName) => {
    try {
      const username = localStorage.getItem("username");
      await startT(username, taskName);
      await handleFetchTasks();
    } catch (error) {
      console.error("Error Starting Task", error);

    }
  }
  // Function to reload the page
  const Reload = () => {
    window.location.reload();
  };
 // Function to add a task and reload the page
  const AddthenReload = async () => {
    await handleAddTask();
    Reload();
  };
  // Function to navigate to the home page
  const HandlebackHome = () => {
    navigate("/Home");
  };
  // Function to navigate to the notes page
  const HandleNotes = () => {
    navigate("/NoteHome");
  };
  // Function to delete a task and reload the page
  const DelthenReload = async (taskName) => {
    await handleDeleteTask(taskName);
    await handleFetchTasks();
  };
  // Function to hanlde the deadline of a task
  const handleDeadline = async (taskData, username) => {
    const today = new Date();
    taskData.forEach(async (task) => {
      const deadline = new Date(task.deadline);
      if (deadline < today) {
        await updateT(username, task.name);
      }
    });
  };
  // Get the current date
  const today = new Date().toLocaleDateString();
  // Render the app
  return (
    <div style={styles.app}>
      <Navbar style={styles.navbar} />
      <div style={styles.container}>
        <div style={styles.taskContainer}>
          <h2>Tasks for {user.nickname}</h2>
          {tasks.length === 0 ? (
            <p>No tasks found. Let's add some!</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} style={styles.taskCard}>
                <h3>{task.name}</h3>
                <p>Category: {task.category}</p>
                <p>Status: {task.status === "Completed" ? "Idle" : task.status}</p>                
                <p>Deadline: {task.deadline}</p>
                <p>Priority: {task.priority}</p>
                <p>Note: {task.note}</p>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteTask(task.name)}
                  style={styles.deleteButton}
                >
                  Delete
                </Button>
                {task.category === "Study" && task.status !== "Done" && task.status !== "Overdue" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={HandleNotes}
                    style={styles.notesButton}
                  >
                    Notes
                  </Button>
                )}
                {task.status !== "Done" && task.status !== "Overdue" && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleDoneTask(task.name)}
                  style={styles.doneButton}
                >
                  Done
                </Button>
                )}
                {task.status === "Completed" && (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => handlestartTask(task.name)}
                  style={styles.startButton}
                >
                  Start
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
            placeholder="Name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            style={styles.input}
            fullWidth
          />
         <Select 
  value={newTask.category}
  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
  style={styles.input}
  fullWidth
>
  <MenuItem value="Study">Study</MenuItem>
  <MenuItem value="Other">Other</MenuItem>
</Select>
          <Select 
            label="Status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            style={styles.input}
            fullWidth
          >
            <MenuItem value="Completed">Idle</MenuItem>
            <MenuItem value="In-progress">In-progress</MenuItem>
          </Select>
          <TextField
            type="date"
            placeholder="Deadline"
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            style={styles.input}
            fullWidth
          />
          <Select 
           
           label="Priority"
           value={newTask.priority}
           onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
           style={styles.input}
           fullWidth
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
// Styling for the app
const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    margin: "0",
    padding: "0",
    overflow: "hidden", 
  },
  navbar: {
    height: "40px", 
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
    marginTop: "50px", 
    height: "calc(100% - 50px)", 
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
  doneButton: {
    position: "absolute",
    top: "5rem",
    right: "1rem",
  },
  startButton: {
    position: "absolute",
    top: "7rem",
    right: "1rem",
  },
  addTaskForm: {
    flex: "1",
    padding: "1rem",
    paddingTop: "4rem",
    overflowY: "auto", 
    height: "100%",
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
