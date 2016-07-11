const User = require('../api/user/user.model');
const authUtils = require('./authutils');
const utilities = require('../components/utilities');
const config = require('../config/environment');
const redis = require('../config/redis');
const uuid = require('uuid');

exports.signup = async function (req, res) {
  // validate username, password and email
  // decorator for validation
  try {
    let registrationId = uuid.v4();
    const user =  await User
      .query()
      .where('email', req.body.email);
    if(user.length) {
      return utilities.responseHandler(new Error('A user with that email already exists'), res, 409);
    }

    const hash = await User.encryptPassword(req.body.password);
    let userInfo = {
      email: req.body.email,
      hash: hash
    };

    await redis.hmsetAsync(registrationId, userInfo);
    redis.expire(registrationId, 2 * 24 * 60 * 60);

    // create a mail sending task
    await utilities.sendMail(req.body.email, [config.mail.registration], 'Verify', getVerificationContent(registrationId));
    return utilities.responseHandler(null, res, 200, {message: 'Sending mail'});

  } catch (e) {
    return utilities.responseHandler(e, res, 500);
  }
};

function getVerificationContent(registrationId) {
  const verificationUrl = `http://${config.host}:${config.port}/auth/verify?token=${registrationId}`;
  return `<a href=${verificationUrl}>Click here to verify</a>`;
}

exports.login = async function (req, res) {
  try {
    const user = await User.query()
      .where({email: req.body.email})
      .first();

    if (user) {
      const passwordMatch = await user.authenticate(req.body.password);
      if (passwordMatch) {
        return res.status(200).send({token: authUtils.createJWT(user)});
      } else {
        return utilities.responseHandler(new Error('Wrong username or password'), res, 422);
      }
    } else {
      return utilities.responseHandler(new Error('Wrong username or password'), res, 422);
    }
  } catch (e) {
    return utilities.responseHandler(e, res, 500);
  }
};

exports.verify = async function (req, res) {
  try {
    const userInfo = await redis.hgetallAsync(req.query.token);

    if (!userInfo) {
      return utilities.responseHandler(new Error('Invalid registration link', res, 400));
    }
    redis.del(req.query.token);

    const user = await User.query()
      .insert(userInfo);

    return utilities.responseHandler(null, res, 201, user);
  } catch (e){
    return utilities.responseHandler(e, res, 500);
  }
};

exports.requestReset = async function (req, res) {
  try {
    const user = await User.query()
      .where({email: req.body.email})
      .first();
    if (!user) {
      return utilities.responseHandler(new Error('No such user exists'), res, 404);
    }
    const resetId = uuid.v4();
    await redis.setAsync(resetId, user.id);
    redis.expire(resetId, 2 * 24 * 60 * 60);
    await utilities.sendMail(req.body.email, [config.mail.support], 'Password Reset', getResetContent(resetId));
    return utilities.responseHandler(null, res, 200, {message: 'Sending email with reset link'});
  } catch (e) {
    return utilities.responseHandler(e, res, 500);
  }
};

function getResetContent(resetId) {
  const verificationUrl = `http://${config.host}:${config.port}/auth/verify?token=${resetId}`;
  return `<a href=${verificationUrl}>Click here to reset</a>`;
}

exports.reset = async function (req, res) {
  try {
    const hash = await User.encryptPassword(req.body.password);
    const userId = await redis.get(req.body.token);
    redis.del(req.body.token);

    // dangerous. should never be ablet set password like this
    await User.query()
      .patchAndFetchById(Number(userId), {hash: hash});

    return utilities.responseHandler(null, res, 200, {message: 'Reset successful'});
  } catch (e) {
    return utilities.responseHandler(new Error('Resetting password failed'), res, 500);
  }
};
