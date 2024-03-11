import axios from 'axios';

const $api = axios.create({
    baseURL: 'https://2k373pwk-7000.euw.devtunnels.ms/api', 
    timeout: 10000, 
    withCredentials: true
});



export default $api;





