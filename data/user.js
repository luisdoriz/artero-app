import api from '../api';

export const loginUser = async (data) => (
  api.user.login(data)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => ({ error }))
);

export default loginUser;