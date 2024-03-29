import axios from "axios";

// const API_URL = "http://localhost:5000/api/goals/";
const API_URL = "https://mushy-gold-shirt.cyclic.app/api/goals/";

//Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

// Get user goals

const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + goalId, config);
  return response.data;
};

const updateGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + goalData._id, goalData, config);
  return response.data;
};

const getSingleGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

const goarService = {
  createGoal,
  getGoals,
  deleteGoal,
  updateGoal,
  getSingleGoal,
};

export default goarService;
