const express = require('express');
const app = express();
const OAuth2Server = require('oauth2-server');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const models = require('./db');
const config = require('./config');
const db = models(config.database.username, config.database.password, config.database.host, config.database.port, config.database.dbname);

app.use(express.static(__dirname + '/../dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

(async () => {
    try {
        await db.init();
        global.db = models;

        const oauth = new OAuth2Server({
            model: require('./controller/oauth/models.js'),
            grants: ['password'],
            debug: true
        });

        const appRoutes = require('./routes').appRoutes(express, oauth);
        app.use('/api/', appRoutes);

        const socketIORoutes = require('./routes').ioRoutes;
        io.on('connection', socketIORoutes);

    } catch (e) {
        console.error(e);
    }
})();

server.listen(config.server.port);