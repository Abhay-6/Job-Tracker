import axios from 'axios';

const api = axios.create({
    baseURL: "https://job-tracker-ten-rosy.vercel.app/api",
    withCredentials:true
})

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;