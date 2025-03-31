// import base from './base' //导入公共的接口域名
// import axios from '../network/request' //导入实例化后的axios


// let www = base.proxy //这里方便了更改域名的话统一修改域名
// const gameCenter = {
//     //这里存放游戏详情页的相关接口
//     showAllGames(value) {
//         return axios.get(www + '/games',{
//             params:{
//                 "id":value
//             }
//         })
//         //字符串新方法
//         // return axios.get(`${www}/showEnterpriseInfo`)
//     }

// }

import base from './base'; // 导入公共的接口域名
import axios from '../network/request'; // 导入实例化后的axios

let www = base.proxy; // 这里方便了更改域名的话统一修改域名

const gameCenter = {
    // 这里存放游戏详情页的相关接口
    showAllGames(value) {
        if (value) {
            return axios.get(www + '/games', {
                params: {
                    "id": value
                }
            });
        }
        return axios.get(www + '/gameCenter/showAllGames');
    },
    searchGames(value) {
        return axios.get(www + `/gameCenter/searchGames?keyword=${value}`);
    },
    filterGames(type) {
        return axios.get(www + `/gameCenter/filterGames?type=${type}`);
    }
};

export default gameCenter;





// USE springdb;

// -- 创建游戏表
// CREATE TABLE games (
//     gameId INT AUTO_INCREMENT PRIMARY KEY,
//     gameName VARCHAR(255) NOT NULL,
//     userId VARCHAR(255) NOT NULL,
//     gameType VARCHAR(255) NOT NULL,
//     gameDetail TEXT,
//     gameVersion VARCHAR(255) NOT NULL,
//     gamePic VARCHAR(255),
//     gameCode VARCHAR(255),
//     publishTime DATETIME
// );