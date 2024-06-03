import React, { useState } from "react";
import { signup } from "../actions/user.action";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await signup(username, email, password);
        if (response.success) {
            alert("Registration successful!");
            navigate("/login");
        } else {
            alert(`Registration failed: ${response.data}`);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Register
                    </Typography>
                    <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        type="text"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" onClick={handleRegister} fullWidth>
                        Register
                    </Button>
                    <Button variant="text" href="/login" fullWidth>
                        Already have an account? Login
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;
