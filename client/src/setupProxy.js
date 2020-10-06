//creates proxy to route links to correct domain
//TODO: https://powerful-brushlands-87033.herokuapp.com/
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        ['/api', '/auth/google'],
        createProxyMiddleware({
            target: 'http://localhost:5000',
        })
    );
};
