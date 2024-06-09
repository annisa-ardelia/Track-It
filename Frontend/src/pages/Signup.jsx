// Import necessary modules
import React, { useState, useEffect } from "react";
import { signup } from "../actions/user.action";
import { avatar } from "../actions/avatar.action";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import userImageMapping from "../images/user.images";

// Signup component
const Signup = () => {
    // Declare necessary states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [avatarList, setAvatarList] = useState([]);
    const [avatarParam, setAvatarParam] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState("female1");
    // Use navigate hook
    const navigate = useNavigate();

    // Fetch avatar data from backend
    useEffect(() => {
        const fetchAvatar = async () => {
            const apiResponse = await avatar();
            if (apiResponse.success) {
                setAvatarList(apiResponse.data);
            } else {
                setError("Failed to fetch avatar");
            }
            setLoading(false);
        };

        fetchAvatar();
    }, []);
    // If loading, display "Loading..."
    if (loading) {
        return <div>Loading...</div>;
    }
    // If error, display error message
    if (error) {
        return <div>{error}</div>;
    }

    // Handle register
    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await signup(username, nickname, password, avatarParam);
        if (response.success) {
            alert("Registration successful!");
            navigate("/login");
        } else {
            alert(`Registration failed: ${response.data}`);
        }
    };
    // Handle avatar click
    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar.image);
        setAvatarParam(avatar.id);
    };
    // Render the signup form
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Register
                    </Typography>
                    <Typography variant="h7">Select Your Avatar</Typography>
                        <div className="avatars" style={{ display: "flex", flexWrap: "wrap" }}>
                            {avatarList.map((avatar, index) => (
                                <img
                                    key={index}
                                    src={userImageMapping[avatar.image]}
                                    alt={avatar.id}
                                    style={{
                                        border: selectedAvatar === avatar.image ? '2px solid blue' : '2px solid transparent',
                                        cursor: 'pointer',
                                        margin: '5px',
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%'
                                    }}
                                    onClick={() => handleAvatarClick(avatar)}
                                />
                            ))}
                        </div>
                    <TextField
                        type="nickname"
                        label="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
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