import axios from "axios";


const baseApiResponse = (data, isSuccess) => {
    return {
        success: isSuccess,
        data: data || null,
    };
};

export const allPets = async (username) => {
    try {
        const response = await axios.post(`http://localhost:5413/pet/getAllP`, {
            username: username
        });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error(error);
        return baseApiResponse(null, false);
    }
};

export const ownedPets = async (username) => {
    try {
        const response = await axios.post(`http://localhost:5413/pet/getOwnedP`, {
            username: username
        });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error(error);
        return baseApiResponse(null, false);
    }
};

export const myNewestPet = async (username) => {
    try {
        const response = await axios.post(`http://localhost:5413/pet/getNewP`, {
            username: username
        });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error(error);
        return baseApiResponse(null, false);
    }
};