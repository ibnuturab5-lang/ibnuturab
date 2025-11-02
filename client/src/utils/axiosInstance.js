import axios from 'axios'

const axiosInstance =axios.create({
    baseURL:'https://curly-space-robot-r45x975r6ggwf5jq5-8080.app.github.dev',
    withCredentials: true,
});
// axiosInstance.interceptors.request.use(
//     (config)=>{
//         config.headers['Content-Type']='application/json';
//     },
//     (error)=>{
//         return Promise.reject(error)
//     }
// )
export default axiosInstance;