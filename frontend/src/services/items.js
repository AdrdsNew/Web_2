import axios from "axios";

const baseUrl = "http://localhost:3001/api/items";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token },
});

const getAll = async () => {
  const response = await axios.get(baseUrl, token ? getConfig() : {});
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, getConfig());
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, getConfig());
};

export default { getAll, create, update, remove, setToken };
