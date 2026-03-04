import axios from "axios";

const url = `http://localhost:3001/api/persons/`;

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(url, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const deleteUrl = url + id;
  return axios.delete(deleteUrl);
};

const getByName = (name) => {
  return getAll().then((persons) => {
    return persons.find((p) => p.name === name);
  });
};

const updateNumber = (newPerson, id) => {
  const request = axios.patch(url + id, newPerson);
  return request;
};

export default { getAll, create, deletePerson, getByName, updateNumber };
