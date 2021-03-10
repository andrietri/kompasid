module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/diary',
                permanent: true,
            },
        ]
    },
}