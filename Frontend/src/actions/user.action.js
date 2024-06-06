import axios from 'axios';

const baseApiResponse = (data, isSuccess) => {
    return {
        data: data || null,
        success: isSuccess
    }
}

export const signup = async (username, nickname, password) => {
    try{
        const response = await axios.post('http://localhost:5413/user/signup', {
            username: username,
            nickname: nickname,
            password: password
        });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Signup failed!:", error);
        return baseApiResponse(error.response ? error.response.data : error.message, false);
    }
}

export const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:5413/user/login', {
            username: username,
            password: password
        });
        localStorage.setItem('token', response.data.token);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Login failed!:", error);
        return baseApiResponse(error.response ? error.response.data : error.message, false);
    }
}

export const getTask = async (username) => {
    try {
      const response = await axios.post('http://localhost:5413/task/getT', {
        username: username
      });
      return Array.isArray(response.data) ? response.data : []; // Ensure it returns an array
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  };
  
  // Function to add a new task for a specific user
  export const addTask = async (taskData) => {
    try {
      const response = await axios.post('http://localhost:5413/task/addT', taskData);
      return response.data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  export const delTask = async(taskData) =>{
    try {
        const response = await axios.post('http://localhost:5413/task/delT', taskData);
        return response.data
    } catch (error) {
        console.error('Error deleting task:', error);
      throw error; 
    }
  }

  export const profile = async (username) => {
    try {
      const response = await axios.post('http://localhost:5413/user/profile', {
        username: username
      });
      return baseApiResponse(response.data, true);
    } catch (error) {
      console.error('Error fetching profile:', error);
      return baseApiResponse(error.response ? error.response.data : error.message, false);
    }
  };