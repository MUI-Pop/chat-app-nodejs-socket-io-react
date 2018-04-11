const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Login = require('../login');

const JWT_ISSUER_NAME = 'justme';
const JWT_ACCESS_TOKEN_SECRET = 'notmuchofasecret';

const dummyClient = {
    clientId: '!client',
    clientSecret: 'justblahblah',
    redirectURI: 'https://github.com/MUI-Pop/',
    grants: ['password', 'refresh_token'],
}

module.exports = {

    generateAccessToken: async (client, user, scope) => {
        let token;
        let expiry = new Date();
        expiry.setHours(expiry.getHours() + 1);

        const payload = {
            issued: JWT_ISSUER_NAME,
            loginId: user.loginId,
            exp: expiry.getTime(),
            client: dummyClient.clientId
        };

        token = JWT.sign(payload, JWT_ACCESS_TOKEN_SECRET, { algorithm: 'HS256' });
        return token;
    },

    getClient: async (clientId, clientSecret) => {
        if (dummyClient.clientId == clientId && dummyClient.clientSecret == clientSecret) {
            return {
                id: dummyClient.clientId,
                redirectUris: dummyClient.redirectURI,
                grants: dummyClient.grants
            };
        }
    },

    getUser: async (username, password) => {
        try {
            let result = await Login.findById(username);
            if(bcrypt.compareSync(password, result.password)){
                return result.toJSON();
            } else {
                throw new Error(`Password doesn't Match`)
            }           
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    saveToken: async (token, client, user) => {
        let expiry = new Date();
        expiry.setHours(expiry.getHours() + 1);

        return {
            accessToken: token.accessToken,
            expires_at: expiry.getTime(),
            client,
            user
        }
    },

    getAccessToken: async (bearerToken) => {
        
        try {
            let decoded = JWT.verify(bearerToken, JWT_ACCESS_TOKEN_SECRET);

            return {
                accessToken: bearerToken,
                accessTokenExpiresAt: new Date(decoded.exp),
                user: decoded,
                client: dummyClient.clientId,
            }

        } catch (err) {
            return false;
        }

    }
}
