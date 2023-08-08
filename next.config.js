
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
    }
}
