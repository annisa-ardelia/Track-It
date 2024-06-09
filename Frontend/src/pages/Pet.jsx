import React, { useState, useEffect } from "react";
import { allPets, ownedPets } from "../actions/pet.action";
import petImageMapping from "../images/pet.images";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import '../index.css';

const MyPets = () => {
    const [allPetsList, setAllPetsList] = useState([]);
    const [myPetsList, setMyPetsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const username = localStorage.getItem('username');

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
        
        // Fetch both all pets and my pets
        Promise.all([fetchAllPets(), fetchMyPets()])
            .catch((error) => {
                setError("Failed to fetch pets");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {/* Navigation bar */}
            <nav style={styles.navbar}>
                <div style={styles.navbarContent}>
                    <Link to="/Home">
                        <Button variant="contained" color="primary">Home</Button>
                    </Link>
                </div>
            </nav>

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
    );
};

const styles = {
    navbar: {
        backgroundColor: "#282c34",
        padding: "1rem",
        color: "white",
        flexShrink: "0",
    },
    navbarContent: {
        display: "flex",
        justifyContent: "space-between",
    },
};

export default MyPets;
