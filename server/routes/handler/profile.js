const User = require('../../controller/user');
const bcrypt = require('bcrypt');

module.exports.create = async (req, res) => {
    let response;
    try {
        let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
        await newUser.create();

        if (req.body.Login) {
            await newUser.createLogin({
                loginId: req.body.Login.loginId,
                password: bcrypt.hashSync(req.body.Login.password, 10)
            })
        }
        response = JSON.stringify(newUser);
    } catch (e) {
        console.error(e);
        response = e;
    } finally {
        res.send(response);
    }
}

module.exports.findAllUsers = async (req, res) => {
        try {
            res.send(await User.findAll());
        } catch (e) {
            console.error(e);
            res.send({});
        }    
}

module.exports.findOneUser = async (req, res) => {
        try {
            res.send(await User.findById(req.params.id));
        } catch (e) {
            res.status(404).send('Profile Not Found');
        }    
}

module.exports.get = async (req, res) => {
    res.send('Not Implemented');
}