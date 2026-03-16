import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000
});

export const locationAPI = {
  getAll: (params) => api.get('/locations', { params }),
  getById: (id) => api.get(`/locations/${id}`)
};

export const hospitalAPI = {
  getAll: (params) => api.get('/hospitals', { params }),
  getById: (id) => api.get(`/hospitals/${id}`)
};

export const trafficAPI = {
  getAll: (params) => api.get('/traffic', { params }),
  getRealtime: () => api.get('/traffic/realtime')
};

export const analyticsAPI = {
  get: () => api.get('/analytics'),
  compute: () => api.get('/analytics/compute')
};

export const aiAPI = {
  search: (query) => api.post('/ai/search', { query }),
  getInsights: (buildingId) => api.post(`/ai/insights/${buildingId}`)
};

export default api;
