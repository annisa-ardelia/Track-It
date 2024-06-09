import axios from 'axios';

const baseApiResponse = (data, isSuccess) => {
  return {
    data: data || null,
    success: isSuccess
  };
};

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

export const addTask = async (taskData) => {
  try {
    const response = await axios.post('http://localhost:5413/task/addT', taskData);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error('Error adding task:', error);
    throw error; 
  }
};

export const delTask = async (taskData) => {
  try {
    const response = await axios.post('http://localhost:5413/task/delT', taskData);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const updateT = async (username, name) => {
  try {
    const response = await axios.post('http://localhost:5413/task/updT', { username: username, name: name });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const doneT = async (username, name) => {
  try {
    const response = await axios.post('http://localhost:5413/task/doneT', { username: username, name: name });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error('Error completing task:', error);
    throw error;
  }
};

export const startT = async (username, name) => {
  try {
    const response = await axios.post('http://localhost:5413/task/startT', { username: username, name: name });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error('Error starting task:', error);
    throw error;
  }
};