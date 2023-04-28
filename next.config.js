const TerserPlugin = require("terser-webpack-plugin");

// module.exports = {


//     webpack: ( config,
//                { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
//     ) => {
//         return {
//             optimization: {
//                 minimize: true,
//                 minimizer: [new TerserPlugin()],
//             },
//             // ...其他配置项
//             devServer: {
//                 proxy: {
//                     '/api/v1': {
//                         target: 'http://10.144.211.163:8080/basic',
//                         secure: false,
//                         changeOrigin: true,
//                         ws: true,
//                         pathRewrite: {
//                             '^/api/v1': '',
//                         },
//                     },
//                 },
//             },
//         };
//     }
// }
