import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    req.headers.AccessControlAllowOrigin = 'http://134.0.115.2:5000';
  
    return req;
});
 
export const fetchGartens = (page) => API.get(`/gartens?page=${page}`);
export const createGarten = (newGarten) => API.post('/gartens/create_garten', newGarten);
export const destroyGartens = () => API.get('/gartens/destroy_gartens');

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const getUsersList = (page) => API.get(`/user/getUserList?page=${page}`);

export const uploadImage = (data) => API.post('/upload/singleImage', data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

