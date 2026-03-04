import axios from "axios";

const baseUrl = `/api/persons/`;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const deleteUrl = baseUrl + id;
  return axios.delete(deleteUrl);
};

const getByName = (name) => {
  return getAll().then((persons) => {
    return persons.find((p) => p.name === name);
  });
};

const updateNumber = (newPerson, id) => {
  const request = axios.patch(baseUrl + id, newPerson);
  return request;
};

export default { getAll, create, deletePerson, getByName, updateNumber };
