const profileHandler = require('./handler/profile');
const authUtils = require('../utils/auth/authAndAuthorize');

module.exports = (router, auth) => {

    router.route('/login')
        .post(authUtils.tokenAuth(auth));

    return router;
}