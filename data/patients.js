import api from '../api';

export const fetchPatients = async (token) => (
  api.patients.get(token)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => ({ error }))
);

export const fetchPatient = async (token, id) => (
  api.patients.getOne(token, id)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => ({ error }))
);

export const searchPatient = async (token, name) => {
  api.patients.search(token, name)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => ({ error }))
}

export default fetchPatients;