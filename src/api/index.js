import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token')).token}`;
    }
  
    req.headers.AccessControlAllowOrigin = 'http://134.0.115.2:5000';
  
    return req;
});
 
export const fetchGartens = (page) => API.get(`/gartens?page=${page}`);
export const createGarten = (newGarten) => API.post('/gartens/create_garten', newGarten);
export const destroyGartens = () => API.get('/gartens/destroy_gartens');

export const fetchSections = (page) => API.get(`/sections?page=${page}`);
export const createSection = (newSection) => API.post('/sections/create_garten', newSection);
export const destroySections = () => API.get('/sections/destroy_gartens');

export const fetchOrganisations = (page) => API.get(`/organisations?page=${page}`);
export const createOrganisation = (newOrganisation) => API.post('/organisations/create', newOrganisation);
export const destroyOrganisations = () => API.get('/organisations/destroy');
export const getOrganisationById = (id) => API.get(`/organisations/getOrganisationById?id=${id}`);

export const addWorker = (newWorker) => API.post('/worker/create', newWorker);
export const getWorkersByOrgId = (org_id) => API.get(`/worker/getWorkersByOrgId?org_id=${org_id}`);

export const addLesson = (newLesson) => API.post('/lesson/create', newLesson);
export const getLessonsByOrgId = (org_id) => API.get(`/lesson/getLessonsByOrgId?org_id=${org_id}`);

export const getInfoSheduller = (org_id) => API.get(`/info/sheduller?org_id=${org_id}`); 

export const createEvent = (body) => API.post('/shedulle/createEvent', body);
export const getEventsByOrgId = (org_id) => API.get(`/shedulle/getShedullesByOrgId?org_id=${org_id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const getUsersList = (page) => API.get(`/user/getUserList?page=${page}`);

export const authUser = () => API.get('/user/auth', { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }});
export const updateUser = (body) => API.post('/user/update', body);

export const uploadImage = (data) => API.post('/upload/image', data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

