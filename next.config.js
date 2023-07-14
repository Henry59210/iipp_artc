
module.exports = {
    reactStrictMode: false,
    productionBrowserSourceMaps: true,
    output:"standalone",
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: 'http://18.136.211.216/api/v2/:path*',
            },
        ]
    },
    // webpack: ( config, options) => {
    //     if (!options.dev) {
    //         config.devtool = options.isServer ? false : {
    //             devServer: {
    //                 proxy: {
    //                     '/api/v1': {
    //                         target: 'http://20.2.129.187',
    //                         secure: false,
    //                         changeOrigin: true,
    //                         ws: true,
    //                         pathRewrite: {
    //                             '^/api/v1': '/api/v2',
    //                         },
    //                     },
    //                 },
    //             },
    //         };
    //     }
    //     return config
    // }
}
