module.exports = [
    {
        method: 'GET',
        path: '/welcome',
        config: {
            auth: false,
            tags: ['api'],
            description: 'Welcome page.'
        },
        handler: (request, h) => {
            return h.view('welcome', { siteTitle: 'Welcome to Node Sweat' });
        },
    },
];
