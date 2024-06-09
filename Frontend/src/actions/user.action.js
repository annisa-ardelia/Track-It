import axios from 'axios';

const baseApiResponse = (data, isSuccess) => {
  return {
    data: data || null,
    success: isSuccess
  };
};

export const signup = async (username, nickname, password, avatar) => {
  try {
    const response = await axios.post('http://localhost:5413/user/signup', {
      username: username,
      nickname: nickname,
      password: password,
      avatar: avatar
    });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Signup failed!:", error);
    return baseApiResponse(error.response ? error.response.data : error.message, false);
  }
};

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
};

export const getNick = async (username) => { 
  try {
    const response = await axios.post('http://localhost:5413/user/nickname', { username: username });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error('Error getting nickname:', error);
    throw error;
  }
};

export const getPoint = async (username) => {
  try {
    const response = await axios.post('http://localhost:5413/user/point', { username: username });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error('Error getting points:', error);
    throw error;
  }
};

export const incrementLevel = async (username) => {
  try {
    const response = await axios.post('http://localhost:5413/user/levUp', { username: username });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error('Error incrementing level:', error);
    throw error;
  }
}

export const updatePoint = async (username, point) => {
  try {
    const response = await axios.post('http://localhost:5413/user/updatePoint', { username: username, point: point });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error('Error updating points:', error);
    throw error;
  }
}

export const getLevel = async (username) => {
  try {
    const response = await axios.post('http://localhost:5413/user/level', { username: username });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error('Error getting level:', error);
    throw error;
  }
}

export const profile = async (username) => {
  try {
    const response = await axios.post('http://localhost:5413/user/profile', { username: username });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return baseApiResponse(error.response ? error.response.data : error.message, false);
  }
};