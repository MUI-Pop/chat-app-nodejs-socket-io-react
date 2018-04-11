const profileHandler = require('./handler/profile');
const authUtils = require('../utils/auth/authAndAuthorize');

module.exports = (router, auth) => {

    router.route('/profiles')
        .get(authUtils.authorize(auth),profileHandler.findAllUsers)
        .post(profileHandler.create);

    router.route('/profiles/:id')
        .get(authUtils.authorize(auth),profileHandler.findOneUser);

    return router;
}

