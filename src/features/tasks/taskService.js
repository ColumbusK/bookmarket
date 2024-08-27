import axios from "axios";


//
const API_URL = 'api/tasks/';


//
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.get(API_URL, config);
  return response.data;
}


const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.post(API_URL, taskData, config);
  return response.data;
}


const updateTask = async (taskId, taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.post(API_URL + taskId.toString(), taskData, config);
  return response.data;
}


const deleteTask = async (taskId, token) => {
  console.log("deleteTask", taskId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.delete(API_URL + taskId.toString(), config);
  return response.data;
}


const taskService = { getTasks, createTask, updateTask, deleteTask };

export default taskService;
