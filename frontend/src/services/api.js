import axios from 'axios';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem('user');
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        
        if (user && user.token) {

          const token = user.token.startsWith('Bearer ') ? user.token : `Bearer ${user.token}`;
          

          config.headers['Authorization'] = token;
          

          config.headers['X-Auth-Token'] = user.token;
          
        }
      } catch (e) {

        console.error('Error parsing user from localStorage', e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    console.error('API Error:', 
      error.config?.url,
      error.response?.status,
      error.response?.data || error.message
    );
    

    if (error.response && error.response.status === 401) {
      console.log('Authentication expired, redirecting to login...');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 