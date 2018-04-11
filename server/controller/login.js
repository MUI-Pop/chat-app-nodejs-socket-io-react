const LoginModel = global.db.Models.Login;

class Login {

  constructor(loginObj) {
    this.loginObj = loginObj;

    if (('loginId' in loginObj) && ('password' in loginObj) && ('userId' in loginObj)) {
      this.loginId = loginObj.loginId;
      this.password = loginObj.password;
      this.userId = loginObj.userId;
    }
  }

  create() {
    return new Promise((resolve, reject) => {
      LoginModel.create(this.loginObj)
        .then((user) => {
          this.loginId = user.loginId;
          this.password = user.password;
          resolve(this);
        })
        .catch(e => {
          reject(e);
        })
    })
  }


  static findById(loginId) {
    return new Promise((resolve, reject) => {
      LoginModel.findById(loginId)
        .then((login) => {
          if(!login)
            reject('Username is not found');
          
          let loginObj = new Login(login);
          resolve(loginObj);
        }).catch(e => {
          reject(e);
        })
    })
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      LoginModel.findAll(
        { include: [{ model: global.db.Models.User }] }
      )
        .then(result => {
          resolve(JSON.stringify(result));
        }).catch(e => {
          reject(e);
        })
    })
  }

  update(loginId) {
    return new Promise((resolve, reject) => {
      LoginModel.update(loginId, { where: { loginId: this.loginId }, returning: true, plain: true })
        .then((user) => {
          resolve();
        }).catch(e => {
          reject(e);
        })
    })
  }

  toJSON() {
    return {
      loginId: this.loginId
    };
  }
}

module.exports = Login;