import axios from "axios";

const API_URL = 'https://knightnewstands.com/api/books/';
const MAG_URL = 'https://knightnewstands.com/api/magzines/';

const getAllBooks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.get(API_URL, config);
  return response.data;
}

const getAllBooksByTag = async (tag, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      title: tag,
    }
  }
  const response = await axios.get(`${API_URL}search`, config);
  console.log("getAllBooksByTag", response.data);
  return response.data;
}

// 获取全部经济学人杂志
const getAllMgazines = async () => {
  const response = await axios.get(`${MAG_URL}`);
  // console.log("getAllMgazines", response.data);
  return response.data;
}

// 获取指定Id杂志信息
const getMagzineById = async (id) => {
  console.log(`api/magzines/${id}`);
  const response = await axios.get(`https://knightnewstands.com/api/magzines/${id}`);
  return response;
  console.log("getMagzineById", response.data);
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

// 确保所有函数都正确导出
const bookService = {
  getAllMgazines,
  getMagzineById,
  getAllBooks,
  getAllBooksByTag,
  createTask,
  updateTask,
  deleteTask,
};

export default bookService;
