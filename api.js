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
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDg2YjM4MTUyNTkyN2UxOGRiMmNiZiIsIm5hbWUiOiJEYW5pZWwgUmFtaXJleiIsImlhdCI6MTU3NDY4ODkzNH0.y4EGLDuTRSKffTbEvESuyiUefKfSDE-V3KXk83uM49M';

const api = {
  host,
  appointment: {
    post( data) {
      const url = `${host}/appointment`;
      postHeader.body = JSON.stringify(data);
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    get( id) {
      const url = `${host}/appointment/${id}`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
  },
  patients: {
    get() {
      const url = `${host}/patients`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    search( name) {
      const url = `${host}/patients/search/${name}`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    post( data) {
      const url = `${host}/profile/newPatient`;
      postHeader.body = JSON.stringify(data);
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    getOne( id) {
      const url = `${host}/patients/${id}`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
  },
  profile: {
    put( data) {
      const url = `${host}/profile`;
      putHeader.headers.authorization = token;
      putHeader.body = JSON.stringify(data);
      return fetch(url, putHeader);
    },
    post( data) {
      const url = `${host}/profile/newProfile`;
      postHeader.body = JSON.stringify(data);
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    get() {
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
