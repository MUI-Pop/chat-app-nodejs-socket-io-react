const UserModel = global.db.Models.User;
const Login = require('./login');
const bcrypt = require('bcrypt');

class User {

  constructor(userObj) {
    this.userObj = userObj;
    if (('firstName' in userObj) && ('lastName' in userObj) && ('email' in userObj)) {
      this.firstName = userObj.firstName;
      this.lastName = userObj.lastName;
      this.email = userObj.email;
      this.login = userObj.Login || null;
    }
    if ('id' in userObj)
      this.id = userObj.id;
  }

  create() {
    return new Promise((resolve, reject) => {
      UserModel.create(this.userObj)
        .then((user) => {
          this.id = user.id;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.email = user.email;
          resolve(this);
        })
        .catch(e => {
          reject(e);
        })
    })
  }

  createLogin(loginObj) {
    loginObj.userId = this.id;
    return new Promise((resolve, reject) => {
      this.login = new Login(loginObj);
      this.login.create()
        .then(loginObj => {
          this.login = loginObj;
          resolve(this);
        }).catch(e => {
          reject(e);
        })
    })
  }

  update(userObj) {
    return new Promise((resolve, reject) => {
      UserModel.update(userObj, { where: { id: this.id }, returning: true, plain: true })
        .then((user) => {
          resolve();
        }).catch(e => {
          reject(e);
        })
    })
  }

  static findById(userId) {
    return new Promise((resolve, reject) => {
      UserModel.findById(userId, { include: [{ model: global.db.Models.Login }] })
        .then((user) => {
          let userObj = new User(user);
          resolve(userObj);
        }).catch(e => {
          reject(e);
        })
    })
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      UserModel.findAll({ include: [{ model: global.db.Models.Login }] })
        .then(result => {
          resolve(JSON.stringify(result));
        }).catch(e => {
          reject(e);
        })
    })
  }

  static findByLoginId(loginId) {
    return new Promise((resolve, reject) => {
      Login.findById(loginId)
        .then((login) => {
            User.findById(login.userId)
            .then((user) => {
              user.login = login;
              resolve(user);
            })
            .catch(e => {
              reject(e);
            })    
        })
        .catch(e => {
          reject(e);
        })
    })
  }

  toJSON() {
    let obj = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    }

    if(this.login){
      obj.Login = this.login.toJSON();
    }else{
      obj.Login = {};
    }

    return obj;
 }
}

module.exports.model = UserModel;
module.exports = User;