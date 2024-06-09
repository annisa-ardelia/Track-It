import axios from 'axios';

const baseApiResponse = (data, isSuccess) => {
  return {
    data: data || null,
    success: isSuccess
  };
};

export const addNote = async (name, username, text) => {
  try {
    const res = await axios.post('http://localhost:5413/note/addN', {
      name: name,
      username: username,
      text: text,
    });
    return baseApiResponse(res.data, true);
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
};

export const getNote = async (username) => {
  try {
    const res = await axios.post('http://localhost:5413/note/getN', { username: username });
    return baseApiResponse(res.data, true);
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};