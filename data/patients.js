import api from '../api';

export const fetchPatients = async (token) => {
  console.log(token)
  return api.patients.get(token)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => ({ error }))
};

export const fetchPatient = async (token, id) => (
  api.patients.getOne(token, id)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => ({ error }))
);

export const addPatient = async (token, data) => (
  api.patients.post(token, data)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => ({ error }))
);

export const putPatient = async (token, id, data) => (
  api.patients.put(token, id, data)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => ({ error }))
);


export const searchPatient = async (name) => {
  api.patients.search(name)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => ({ error }))
}

export default fetchPatients;