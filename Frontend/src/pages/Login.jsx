import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/user.action";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await login(username, password);
        if (response.success) {
            alert("Login successful!");
            navigate("/home"); // Redirect to Home page
        } else {
            alert("Login failed!");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
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
                    <Button variant="contained" onClick={handleLogin} fullWidth>
                        Login
                    </Button>
                    <Button variant="text" href="/signup" fullWidth>
                        Don't have an account? Register
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;