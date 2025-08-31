
import axios from "axios";

const API_URL = "http://localhost:8081/api";

// Register user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(API_URL+'/register', data);
    return response.data; 
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error; 
  }
};

// Login user
export const login = async (data) => {
  try {
    const response = await axios.post(API_URL+'/login', data);
    return response.data; 
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error; 
  }
};
