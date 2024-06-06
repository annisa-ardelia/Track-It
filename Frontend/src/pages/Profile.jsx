import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Profile = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/user/profile?username=${username}`);
    
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                } else {
                    console.error("Failed to fetch profile data.");
                }
            } catch (err) {
                console.error("Failed to fetch profile data:", err);
            }
        };
    
        // Fetch profile only when the component mounts or when the username changes
        if (username.trim() !== "") {
            fetchProfile();
        }
    }, [username]);
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Profile
                    </Typography>
                    {username && (
                        <div style={{ marginTop: '20px' }}>
                            <Typography variant="h6">Username: {username}</Typography>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
