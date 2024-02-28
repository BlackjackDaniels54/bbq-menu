import axios from 'axios';

const $api = axios.create({
    baseURL: 'http://localhost:7000/api', // Укажите ваш базовый URL
    timeout: 10000, // Настройте таймаут запроса (в миллисекундах)
    withCredentials: true
});



export default $api;





