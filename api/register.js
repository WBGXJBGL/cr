import base from './base'  //导入公共的接口域名
import axios from '../network/request'  //导入实例化后的axios


let www=base.proxy  //这里方便了更改域名的话统一修改域名
const register={
    
    register(value) {
        console.log(value)
        return axios.post(`${www}/register`,value)
    },
    registerJudge(value){
        return axios.post(`${www}/registerJudge`,{
            params:value
        })
    }
   
}   
export default register
// import base from './base';
// import registerAxios from '../network/registerRequest';//专门为注册请求创建一个新的 axios 实例，并且设置好所需的请求头。

// let www = base.proxy;

// const register = {
//     registerJudge(value) {
//         return registerAxios.post(`${www}/registerJudge`, value);
//     },
//     registerPerfect(value) {
//         return registerAxios.post(`${www}/register`, value);
//     }
// };

// export default register;

