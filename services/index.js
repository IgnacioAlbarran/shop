const jwt = require('jwt-simple');
const moment = require('moment');
const secrets = require('../secrets')

  function auth(user){
    const payload = {
      sub: user.id,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, secrets.SECRET_TOKEN)
  }

  // function signIn(req, res){
  //   UserRepository.find({ email: req.body.email }, (error, res) =>{
  //     if (error) res.status(500).send({message: error})
  //     if (!user) res.status(404).send({ message: 'User not found'})

  //     bcrypt.compare(req.body.password, secrets.SECRET_TOKEN, function(err, res) {
  //       if(req.body.password != user.password){
  //         res.json({success: false, message: 'passwords does not match'});
  //       } else {
  //         req.user = user;
  //         res.send({ token: this.auth(req.user) })
  //       }
  //     });
  //   })
  // }

module.exports = {
  auth
}