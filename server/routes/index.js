const profileRoutes = require('./profile');
const authRoutes = require('./auth');

module.exports.appRoutes = (app, auth) => {

    const router = app.Router();
    profileRoutes(router, auth);
    authRoutes(router, auth);

    return router;
}

module.exports.ioRoutes = (client) => {
    client.emit('news', { test: 'world' });
    client.on('my other event', (data) => {
    });
}

