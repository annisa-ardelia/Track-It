import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { profile } from "../actions/user.action";


const Profile = () => {
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            fetchProfile(savedUsername);
        }
    }, []);

    const fetchProfile = async (username) => {
        try {
            const response = await profile(username);
            if (response.ok) {
                const data = await response.json();
                setNickname(data.nickname);  // Correctly handle JSON response
            } else {
                console.error("Failed to fetch profile data.");
            }
        } catch (err) {
            console.error("Failed to fetch profile data:", err);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Profile
                    </Typography>
                    {nickname && (
                        <div style={{ marginTop: '20px' }}>
                            <Typography variant="h6">Nickname: {nickname}</Typography>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
