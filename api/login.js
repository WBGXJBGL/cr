// import base from './base'
// import axios from '../network/request'

// let www=base.proxy

// const login={
//     login(value){
//         console.log(value)
//         return axios.post(www+'/login',{
//             params:value
//         })
//     },
//     // loginJudge(value){
//     //     return axios.post(`${www}/loginJudge`,{
//     //         params:value
//     //     })
//     // }

// }

// export default login

import base from './base'
import axios from '../network/request'

let www = base.proxy

const login = {
    login(value) {
        console.log(value)
        return axios.post(www + '/login', value)
    },
    // loginJudge(value){
    //     return axios.post(`${www}/loginJudge`,{
    //         params:value
    //     })
    // }
}

// CreateYourGames/src/api/login.js
// const login = {
//     login(value) {
//         console.log('请求参数:', value);
//         return axios.post(www + '/login', value)
//            .then(response => {
//                 console.log('响应结果:', response);
//                 return response.data;
//             })
//            .catch(error => {
//                 console.error('请求出错:', error);
//                 throw error;
//             });
//     }
// }

export default login

// 在 $api.login.login 方法内部添加日志
// export default {
//     login: {
//       login(value) {
//         return axios.post('/api/login', value)
//           .then(response => {
//             console.log('登录请求响应数据:', response.data);
//             return response.data;
//           })
//           .catch(error => {
//             console.error('登录请求出错:', error);
//             throw error;
//           });
//       }
//     }
//   };