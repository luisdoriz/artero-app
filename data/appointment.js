import api from '../api';

export const postAppointment = async (token, data) => (
  api.appointment.post(token, data)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => ({ error }))
);

export const getAppointments = async (token, id) => (
  api.appointment.get(token, id)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => ({ error }))
);

export const getAppointment = async (token, id) => (
  api.appointment.getById(token, id)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => ({ error }))
);

export default postAppointment;