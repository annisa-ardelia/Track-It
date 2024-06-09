import axios from 'axios';

const baseApiResponse = (data, isSuccess) => {
    return {
        data: data || null,
        success: isSuccess
    }
};

export const avatar = async () => {
    try {
        const response = await axios.get('http://localhost:5413/avatar/pict');
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error('Error fetching avatar:', error);
        return baseApiResponse(error.message, false);
    }
};