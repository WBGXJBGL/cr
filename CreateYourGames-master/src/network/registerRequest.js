import axios from 'axios';

// 创建一个新的 axios 实例，用于注册请求
const registerAxios = axios.create({
    headers: {
        // 这里设置你注册请求需要的请求头，比如 application/json
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});

export default registerAxios;