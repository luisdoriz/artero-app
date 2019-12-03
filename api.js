const host = 'https://artero.herokuapp.com/api';

const getHeader = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const postHeader = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const fileHeader = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
  },
};

const putHeader = {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};


const api = {
  host,
  appointment: {
    post(token, data) {
      const url = `${host}/appointment`;
      postHeader.body = JSON.stringify(data);
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    get(token, id) {
      const url = `${host}/appointment/${id}`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    getById(token, id) {
      const url = `${host}/appointment/one/${id}`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
  },
  patients: {
    get(token) {
      const url = `${host}/patients`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    search( name) {
      const url = `${host}/patients/search/${name}`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    post(token, data) {
      const url = `${host}/profile/newPatient`;
      postHeader.body = JSON.stringify(data);
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    put(token, id, data) {
      const url = `${host}/patients/${id}`;
      putHeader.body = JSON.stringify(data);
      putHeader.headers.authorization = token;
      return fetch(url, putHeader);
    },
    getOne(token, id) {
      const url = `${host}/patients/${id}`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
  },
  profile: {
    put(token, data) {
      const url = `${host}/profile`;
      putHeader.headers.authorization = token;
      putHeader.body = JSON.stringify(data);
      return fetch(url, putHeader);
    },
    post(token, data) {
      const url = `${host}/profile/newProfile`;
      postHeader.body = JSON.stringify(data);
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    get(token) {
      const url = `${host}/profile`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
  },
  user: {
    login(data) {
      const url = `${host}/users/login`;
      postHeader.body = JSON.stringify(data);
      return fetch(url, postHeader);
    },
  },
};

export default api;
