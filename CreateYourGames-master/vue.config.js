// const path = require('path');

// module.exports = {
//     productionSourceMap: false,
//     publicPath: process.env.Node_ENV === 'production' ? '' : './',
//     assetsDir: 'assets',
//     // devServer:{
//     //     proxy: {
//     //         '/api': {
//     //             target: 'http://121.40.245.126:3000',
//     //             // target: 'http://localhost:3000',
//     //             changeOrigin: true,
//     //             // pathRewrite: {
//     //             //     '^/api': ''
//     //             // }
//     //         }
//     //     }
//     // }
   
// }

const path = require('path');

module.exports = {
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production' ? '' : './',
    assetsDir: 'assets',
    devServer: {
        proxy: {
            '/': { 
                target: 'http://localhost:8088', 
                changeOrigin: true, 
            }
        }
    }
}