const oauthServer = require('oauth2-server');
const Request = oauthServer.Request;
const Response = oauthServer.Response;

module.exports.tokenAuth = (auth) => {
    return (req,res,next) => {
        let request = new Request(req);
        let response = new Response(res);        

        return auth
          .token(request, response)
          .then((token) => {
            return res.json(token)
          }).catch((err) => {
            return res.status(401).json("Invalid Username or Password");
          })
      }
}

module.exports.authorize = (auth) => {
    return (req, res, next) => {
        let request = new Request(req);
        let response = new Response(res);
        return auth.authenticate(request, response)
        .then( (code) => {
          next();
        })
        .catch( (err) => {
            res.send(err);
        });
    }
}


