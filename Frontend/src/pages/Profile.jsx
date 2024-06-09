// Import necessary modules
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { profile } from "../actions/user.action";
import userImageMapping from "../images/user.images";
import Navbar from "../components/Navbar";

// Profile component
const Profile = () => {
    // Set necessary states
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // Fetch user data from backend
    useEffect(() => {
        const fetchAvatar = async () => {
            const username = localStorage.getItem("username");
        
            const apiResponse = await profile(username);
                if (apiResponse.success) {
                setUser(apiResponse.data);
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
    // Return the profile page
    return (
        <div>
        <Navbar/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom style={styles.Profiletext}>
                        Profile
                    </Typography>
                    <Avatar
                        src={userImageMapping[user.avatar]}
                        alt={user.username}
                        style={{ width: 100, height: 100, margin: '20px auto' }}
                    />
                    {user.nickname && (
                        <div style={{ marginTop: '20px' }}>
                            <Typography variant="h6">Username: {user.username}</Typography>
                            <Typography variant="h6">Nickname: {user.nickname}</Typography>
                            <Typography variant="h6">Level: {user.level}</Typography>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
        </div>
    );
};

// Styles for the Profile
const styles ={
    Profiletext: {
        textAlign: 'center',
        },
};

export default Profile;
