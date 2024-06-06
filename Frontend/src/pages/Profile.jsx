import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getNick } from "../actions/user.action";


const Profile = () => {
    const [nickname, setNickname] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
          try {
            const username = localStorage.getItem("username");
            const nicknameData = await getNick(username);
            setNickname(nicknameData.nickname); 
          } catch (error) {
            console.error("Error fetching initial data:", error);
          }
        };
    
        fetchInitialData();
      }, []);

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
