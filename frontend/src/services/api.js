import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with common config
const api = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Portfolio API Service
export const portfolioApi = {
  // Get complete portfolio data
  async getPortfolio() {
    try {
      const response = await api.get('/portfolio');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
      return {
        success: false,
        error: error.response?.data?.detail || error.message || 'Failed to load portfolio data'
      };
    }
  },

  // Profile endpoints
  async getProfile() {
    try {
      const response = await api.get('/profile');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to load profile'
      };
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await api.put('/profile', profileData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to update profile'
      };
    }
  },

  // Skills endpoints
  async getSkills() {
    try {
      const response = await api.get('/skills');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to load skills'
      };
    }
  },

  async updateSkills(skillsData) {
    try {
      const response = await api.put('/skills', skillsData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to update skills'
      };
    }
  },

  // Experience endpoints
  async getExperience() {
    try {
      const response = await api.get('/experience');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to load experience'
      };
    }
  },

  async addExperience(experienceData) {
    try {
      const response = await api.post('/experience', experienceData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to add experience'
      };
    }
  },

  async updateExperience(id, experienceData) {
    try {
      const response = await api.put(`/experience/${id}`, experienceData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to update experience'
      };
    }
  },

  async deleteExperience(id) {
    try {
      const response = await api.delete(`/experience/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to delete experience'
      };
    }
  },

  // Projects endpoints
  async getProjects() {
    try {
      const response = await api.get('/projects');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to load projects'
      };
    }
  },

  async addProject(projectData) {
    try {
      const response = await api.post('/projects', projectData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to add project'
      };
    }
  },

  async updateProject(id, projectData) {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to update project'
      };
    }
  },

  async deleteProject(id) {
    try {
      const response = await api.delete(`/projects/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to delete project'
      };
    }
  }
};

export default api;