import axios from 'axios';

const baseApiResponse = (data, isSuccess) => {
    return {
        data: data || null,
        success: isSuccess
    }
}

export const signup = async (username, email, password) => {
    try{
        const response = await axios.post('http://localhost:3001/user/signup', {
            username: username,
            email: email,
            password: password
        });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Singup failed!:", error);
        return baseApiResponse(error.response.data, false);
    }
}

export const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:3001/user/login', {
            username: username,
            password: password
        });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Login failed!:", error);
        return baseApiResponse(error.response.data, false);
    }
}