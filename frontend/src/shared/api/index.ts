// import router from "@/app/router";
import axios from "axios";

export const $API = axios.create({
  baseURL: '/api',
  withCredentials: true
})

$API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

$API.interceptors.response.use((config) => {
  return config
}, (async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401) {
    try {
      const response = await axios.get('/api/user/refresh')
      localStorage.setItem('token', response.data.accessToken)
      $API.request(originalRequest);
    } catch (e) {
      /* TODO: Нужно сделать вывод уведомления о том, что пользователь не авторизован */
      // router.push({name: 'login'})
    }
  }
}))
