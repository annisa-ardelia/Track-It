// Import necessary modules
import React, { useState, useEffect } from "react";
import { allPets, ownedPets } from "../actions/pet.action";
import petImageMapping from "../images/pet.images";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// MyPets component
const MyPets = () => {
    // State variables to store all pets and my pets
    const [allPetsList, setAllPetsList] = useState([]);
    const [myPetsList, setMyPetsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Get username from localStorage
    const username = localStorage.getItem('username');

    // Fetch all pets and my pets data from backend
    useEffect(() => {
        const fetchAllPets = async () => {
            const apiResponse = await allPets(username);
            if (apiResponse.success) {
                setAllPetsList(apiResponse.data);
            } else {
                setError("Failed to fetch all pets");
            }
            setLoading(false);
        };

        const fetchMyPets = async () => {
            const apiResponse = await ownedPets(username);
            if (apiResponse.success) {
                setMyPetsList(apiResponse.data);
            } else {
                setError("Failed to fetch my pets");
            }
            setLoading(false);
        };
        // Fetch all pets and my pets data
        Promise.all([fetchAllPets(), fetchMyPets()])
            .catch((error) => {
                setError("Failed to fetch pets");
                setLoading(false);
            });
    }, []);
    // If loading, display "Loading..."
    if (loading) {
        return <div>Loading...</div>;
    }
    // If error, display error message
    if (error) {
        return <div>{error}</div>;
    }
    // Return the MyPets page
    return (
        <div style={styles.container}>

            <Navbar style={styles.navbar} />

            <div style={styles.content}>
                <p className="p-4 text-3xl font-bold">
                    My Pets 
                </p>
                <div className="p-4 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-8">
                    {myPetsList.map((pet) => (
                        <div key={pet.id} className="overflow-hidden flex flex-col items-center">
                            <img className="h-50" src={petImageMapping[pet.pet_avatar]} alt={pet.name} />
                            <p>{pet.name}</p>
                        </div>
                    ))}
                </div>
                <p className="p-4 text-3xl font-bold">
                    Not Owned
                </p>
                <div className="p-4 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-8">
                    {allPetsList.map((pet) => (
                        <div className="overflow-hidden flex flex-col items-center">
                            <img className="h-50 blackout" src={petImageMapping[pet.pet_avatar]} alt={pet.name} />
                            <p>???</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
// Styles for the MyPets
const styles = {
    container: {
        paddingTop: "4rem", },
    navbar: {
        paddingBottom: "0.5rem", },
    content: {
        padding: "0 2rem", 
    },
};

export default MyPets;
